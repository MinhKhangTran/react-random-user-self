import React from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock
} from "react-icons/fa";
import styled from "styled-components";

const url = "https://randomuser.me/api/";
const defaultBild = "https://randomuser.me/api/portraits/men/75.jpg";
export default function App() {
  const [person, setPerson] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("name");
  const [desc, setDesc] = React.useState("Peter Doe");

  const fetchPerson = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data.results[0]);
    const people = data.results[0];
    const { first, last } = people.name;
    const { street:{number,name} } = people.location;
    const { email, phone } = people;
    const { password } = people.login;
    const { age } = people.dob;
    const { large: img } = people.picture;
    const newPerson = {
      name: `${first} ${last}`,
      street: `${number}, ${name}`,
      email,
      phone,
      password,
      age,
      img
    };
    setPerson(newPerson);
    setTitle("name");
    setDesc(newPerson.name);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchPerson();
  }, []);
  const handleMouse = (e) => {
    // console.log(e.currentTarget);
    if (e.currentTarget.classList.contains("hover:text-blue-500")) {
      // console.log("it worked");
      // console.log(e.currentTarget.dataset.label);
      const personDesc = e.currentTarget.dataset.label;
      setTitle(personDesc);
      setDesc(person[personDesc]);
    }
  };
  return (
    <>
      <div className="bg-gray-500 w-screen" style={{ height: "50vh" }}></div>
      <div
        className="bg-gray-100 w-screen flex justify-center"
        style={{ height: "50vh" }}
      >
        <Wrapper className="shadow-xl bg-gray-200 md:w-2/3 w-11/12 text-center relative rounded-lg">
          <div className="flex justify-center relative ">
            <img
              className="rounded-full overflow-hidden mt-12 border-8 border-white"
              src={(person && person.img) || defaultBild}
              alt="random user"
            />
          </div>
          <h3>
            My{" "}
            <span className="capitalize text-gray-700 underline">{title}</span>{" "}
            is
          </h3>
          <h1 className="font-bold text-gray-600 tracking-wider">{desc}</h1>
          <div className="grid grid-cols-6 w-full justify-items-center mt-4 text-gray-600 text-xl md:text-2xl">
            <button
              className="hover:text-blue-500"
              data-label="name"
              onMouseOver={handleMouse}
            >
              <FaUser />
            </button>
            <button
              className="hover:text-blue-500"
              data-label="email"
              onMouseOver={handleMouse}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="hover:text-blue-500"
              data-label="age"
              onMouseOver={handleMouse}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="hover:text-blue-500"
              data-label="street"
              onMouseOver={handleMouse}
            >
              <FaMap />
            </button>
            <button
              className="hover:text-blue-500"
              data-label="phone"
              onMouseOver={handleMouse}
            >
              <FaPhone />
            </button>
            <button
              className="hover:text-blue-500"
              data-label="password"
              onMouseOver={handleMouse}
            >
              <FaLock />
            </button>
          </div>
          <button
            className="mt-6 bg-gray-600 text-gray-100 rounded px-3 py-1 hover:bg-blue-500 hover:text-blue-100"
            onClick={() => {
              fetchPerson();
            }}
          >
            {`${loading ? "Loading..." : "Surprise me"}`}
          </button>
        </Wrapper>
      </div>
    </>
  );
}

const Wrapper = styled.article`
  margin-top: -200px;
  height: 375px;
  border-radius: 20px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 130px;
    width: 100%;
    background: #bada55;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
`;
