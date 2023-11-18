import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { differenceInYears } from "date-fns";

import Container from "react-bootstrap/Container";
// import { Country, State, City } from "country-state-city";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

const Register = () => {
  const POST_URL = "http://localhost:4000/postuser";
  let errors = {};
  const navigate = useNavigate();
  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dob: "",
    age: "",
  };
  const [user, setUser] = useState(initialValues);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [inputsError, setInputsError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    const getCoutries = async () => {
      let res = await GetCountries();
      setCountriesList(res);
      console.log(res, "data");
    };

    getCoutries();
  }, []);

  useEffect(() => {
    const getStates = async () => {
      let res = await GetState(countryid);
      setStateList(res);
      console.log(res, "state");
    };

    getStates();
  }, [countryid]);

  useEffect(() => {
    const getCities = async () => {
      let res = await GetCity(countryid, stateid);
      setCityList(res);
      console.log(res, "city");
    };

    getCities();
  }, [countryid, stateid]);

  let name, value;
  const handleChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    console.log(name, value, "data2");
    // setUser({ ...user, [name]: value });
    if (name === "country") {
      const c = value.split("@");

      setCountryid(Number(c[1]));
      setUser({ ...user, [name]: c[0] });
      console.log(c[0], "idc");
    } else if (name === "state") {
      const s = value.split("@");

      setStateid(Number(s[1]));
      setUser({ ...user, [name]: s[0] });
      console.log(stateid, "ids");
    } else {
      setUser({ ...user, [name]: value });
    }
  };
  console.log(user, "userData");

  useEffect(() => {
    if (Object.keys(inputsError).length === 0 && isSubmit) {
      abc();
    }
  }, [initialValues]);

  async function abc() {
    try {
      const {
        firstname,
        lastname,
        email,
        country,
        state,
        city,
        gender,
        dob,
        age,
      } = user;
      const response = await axios.post(POST_URL, {
        firstname,
        lastname,
        email,
        country,
        state,
        city,
        gender,
        dob,
        age,
      });

      console.log(response, "res...............///");
      window.alert(response.data.message);
      console.log("Successfull Registration");
      setUser(initialValues);
      navigate("/home");
    } catch (error) {
      window.alert(error.response.data.message);
    }
  }

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexx = /^[a-z]+$/i;

    if (!values.firstname) {
      errors.firstname = "First Name is reuired!";
    } else if (values.firstname.length < 5) {
      errors.firstname = "First Name must be in 5 chracter!";
    } else if (!regexx.test(values.firstname)) {
      errors.firstname = "only alphabets ";
    }

    if (!values.lastname) {
      errors.lastname = "Last Name is reuired!";
    } else if (values.lastname.length < 5) {
      errors.lastname = "Last Name must be in 5 chracter!";
    } else if (!regexx.test(values.lastname)) {
      errors.lastname = "only alphabets";
    }
    if (!values.email) {
      errors.email = "Email is reuired!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.age) {
      errors.age = "Age is reuired!";
    } else if (values.age <= 14) {
      errors.age =
        "You are not Eligible your age must be more than be 14 Years";
    }

    if (!values.country) {
      errors.country = "Country is reuired!";
    }
    if (!values.state) {
      errors.state = "State is reuired!";
    }
    if (!values.city) {
      errors.city = "City is reuired!";
    }
    if (!values.dob) {
      errors.dob = "Date Of Birth is reuired!";
    }

    if (!values.gender) {
      errors.gender = "Gender is reuired!";
    }

    return errors;
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    console.log(user, "ggggggggggggggggggggggggggggggggggg");
    // abc();

    setInputsError(validate(user));
    setIsSubmit(true);
  };
  useEffect(() => {
    setUser({ ...user, age: calculateAge() });
  }, [user.dob]);
  const calculateAge = () => {
    const today = new Date();
    const birthDateObj = new Date(user.dob);
    const ageYears = differenceInYears(today, birthDateObj);
    return ageYears;
  };
  return (
    <>
      <Container>
        <form onSubmit={submitHandle}>
          <div className="row">
            <div className="col-6">
              <div class="mb-3">
                <label for="exampleFirstname" class="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="firstname"
                  class="form-control"
                  id="exampleFirstname"
                  aria-describedby="emailHelp"
                  value={user.firstname}
                />
                {/* <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div> */}
              </div>
              <p style={{ color: "red" }}>{inputsError.firstname}</p>
              <div class="mb-3">
                <label for="exampleLastname" class="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="lastname"
                  class="form-control"
                  id="exampleLastname"
                  value={user.lastname}
                />
              </div>
              <p style={{ color: "red" }}>{inputsError.lastname}</p>
              <div class="mb-3">
                <label for="exampleEmail" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                  class="form-control"
                  id="exampleEmail"
                />
              </div>
              <p style={{ color: "red" }}>{inputsError.email}</p>
              <div class="mb-3">
                <label for="exampleCountry" class="form-label">
                  Country
                </label>
                <select
                  class="form-select"
                  onChange={handleChange}
                  name="country"
                  id="exampleCountry"
                  //   aria-label="Default select example"
                >
                  {countriesList &&
                    countriesList.map((country) => (
                      <option
                        key={country.id}
                        value={country?.name + "@" + country?.id}
                        selected
                      >
                        {country.name}
                      </option>
                    ))}
                </select>
              </div>
              <p style={{ color: "red" }}>{inputsError.country}</p>
              <label for="exampleInputPassword1" class="form-label">
                Gender
              </label>
              <div class="mb-3 form-check" style={{ display: "flex" }}>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    value={"Male"}
                    onChange={handleChange}
                    id="flexRadioDefault1"
                    checked={user.gender === "Male"}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                </div>
                <div class="form-check" style={{ marginLeft: "15px" }}>
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault2"
                    value={"Female"}
                    onChange={handleChange}
                    checked={user.gender === "Female"}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
              </div>
              <p style={{ color: "red" }}>{inputsError.gender}</p>
            </div>

            <div className="col-6">
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  State
                </label>
                <select
                  class="form-select"
                  onChange={handleChange}
                  name="state"
                  aria-label="Default select example"
                >
                  {stateList &&
                    stateList.map((state) => (
                      <option
                        key={state.name}
                        value={state.name + "@" + state.id}
                        selected
                      >
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>
              <p style={{ color: "red" }}>{inputsError.state}</p>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  City
                </label>
                <select
                  class="form-select"
                  onChange={handleChange}
                  name="city"
                  aria-label="Default select example"
                >
                  {cityList &&
                    cityList.map((city) => (
                      <option key={city.name} value={city.name} selected>
                        {city.name}
                      </option>
                    ))}
                </select>
              </div>
              <p style={{ color: "red" }}>{inputsError.city}</p>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  class="form-control"
                  id="exampleInputPassword1"
                  value={user.dob}
                />
              </div>
              <p style={{ color: "red" }}>{inputsError.dob}</p>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  onChange={handleChange}
                  class="form-control"
                  id="exampleInputPassword1"
                  value={user.age}
                />
              </div>
              <p style={{ color: "red" }}>{inputsError.age}</p>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default Register;
