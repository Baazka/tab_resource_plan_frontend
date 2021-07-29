import React, { useState, useEffect, useReducer } from "react";
import Header from "./header";
const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function National(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/national"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.PERSON_NATIONAL_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ PERSON_NATIONAL_ID: text.target.value },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.NATIONAL_ID}>
            {nation.NATIONAL_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Subnational(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios("http://hr.audit.mn/hr/api/v1/library/surname");
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      // <select
      //   disabled={props.edit}
      //   className="anketInput"
      //   value={props.personChild?.SURNAME_NAME}
      //   onChange={(text) =>
      //     props.setPersonChild({
      //       ...props.personChild,
      //       ...{ SURNAME_NAME: text.target.value },
      //     })
      //   }
      // >
      // {data?.map((nation, index) => (
      //   <option key={index} value={nation.SURNAME_NAME}>
      //     {nation.SURNAME_NAME}
      //   </option>
      // ))}
      <div>
        <input
          list="browsers"
          name="browser"
          id="browser"
          disabled={props.edit}
          className="anketInput"
          value={props.personChild?.SURNAME}
          onChange={(text) =>
            props.setPersonChild({
              ...props.personChild,
              ...{ SURNAME: text.target.value },
            })
          }
        />
        <datalist id="browsers">
          {data?.map((nation, index) => (
            <option key={index} value={nation.SURNAME} />
          ))}
        </datalist>
      </div>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Dynasty(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios("http://hr.audit.mn/hr/api/v1/library/dynasty");
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.DYNASTY_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ DYNASTY_ID: text.target.value },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.DYNASTY_ID}>
            {nation.DYNASTY_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Office(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios("http://hr.audit.mn/hr/api/v1/library/office");
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className={props.fullWidth === true ? "anketInputWidth" : "anketInput"}
        value={props.personChild?.OFFICE_ID}
        onChange={(text) => {
          props.setPersonChild({
            ...props.personChild,
            ...{ OFFICE_ID: text.target.value, index: props.index },
          });
          // props.forceUpdate();
        }}
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.OFFICE_ID}>
            {nation.OFFICE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Suboffice(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/suboffice"
    );

    loadData(
      listItems.data?.filter(
        (a) => parseInt(a.OFFICE_ID) === parseInt(props.personChild.OFFICE_ID)
      )
    );
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className={props.fullWidth === true ? "anketInputWidth" : "anketInput"}
        value={props.personChild?.SUB_OFFICE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ SUB_OFFICE_ID: text.target.value, index: props.index },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.SUB_OFFICE_ID}>
            {nation.SUB_OFFICE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Edutype(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios("http://hr.audit.mn/hr/api/v1/library/edutype");
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.EDUCATION_TYPE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ EDUCATION_TYPE_ID: text.target.value, index: props.index },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.EDUCATION_TYPE_ID}>
            {nation.EDUCATION_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function FamilyArray(props) {
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [data, loadData] = useState();
  useEffect(async () => {
    let listItems = await axios("http://hr.audit.mn/hr/api/v1/library/family");
    loadData(listItems.data);
  }, []);
  let listItems;

  if (data !== undefined) {
    listItems = (
      <select
        style={{ width: "70px" }}
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.MEMBER_ID}
        onChange={(e) => {
          props.emergencyArray[props.indexChild].MEMBER_ID = e.target.value;
          props.emergencyArray[props.indexChild].UPDATED_BY =
            userDetils?.USER_ID;
          props.emergencyArray[props.indexChild].UPDATED_DATE = dateFormat(
            new Date(),
            "dd-mmm-yy"
          );
          props.setPersonChild(props.emergencyArray);
          forceRender();
        }}
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.FAMILY_ID}>
            {nation.FAMILY_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Examtype(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/examtype"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.EXAM_TYPE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ EXAM_TYPE_ID: text.target.value },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.EXAM_TYPE_ID}>
            {nation.EXAM_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Fametype(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/fametype"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.FAME_TYPE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ FAME_TYPE_ID: text.target.value },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.FAME_TYPE_ID}>
            {nation.FAME_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Subfametype(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/subfametype"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.SUBFAME_TYPE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ SUBFAME_TYPE_ID: text.target.value },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.SUBFAME_TYPE_ID}>
            {nation.SUBFAME_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Forcetype(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/forcetype"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.FORCE_TYPE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ FORCE_TYPE_ID: text.target.value },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.FORCE_TYPE_ID}>
            {nation.FORCE_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Language(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/language"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.LANGUAGE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{
              LANGUAGE_ID: text.target.value,
              index: props.index,
              type: props.type,
            },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.LANGUAGE_ID}>
            {nation.LANGUAGE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Languagetype(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/languagetype"
    );
    loadData(listItems.data);
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.[props.type]}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{
              [props.type]: text.target.value,
              index: props.index,
            },
          })
        }
        style={{ width: "80px" }}
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.LANGUAGE_TYPE_ID}>
            {nation.LANGUAGE_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Literaturetype(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/literaturetype"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.LITERATURE_TYPE_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ LITERATURE_TYPE_ID: text.target.value },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.LITERATURE_TYPE_ID}>
            {nation.LITERATURE_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function DepartmentID(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/department"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.DEPARTMENT_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ DEPARTMENT_ID: text.target.value, check: false },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.DEPARTMENT_ID}>
            {nation.DEPARTMENT_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Subdepartment(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/subdepartment"
    );
    if (
      props.personChild.DEPARTMENT_ID === undefined ||
      props.personChild.DEPARTMENT_ID === null ||
      props.personChild.DEPARTMENT_ID === ""
    ) {
      loadData(listItems.data);
    } else
      loadData(
        listItems.data?.filter(
          (a) =>
            parseInt(a.DEPARTMENT_ID) ===
            parseInt(props.personChild.DEPARTMENT_ID)
        )
      );
  }, []);

  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.SUB_DEPARTMENT_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ SUB_DEPARTMENT_ID: text.target.value, check: false },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.SUB_DEPARTMENT_ID}>
            {nation.SUB_DEPARTMENT_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Compartment(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/Compartment"
    );
    if (
      props.personChild.SUB_DEPARTMENT_ID !== undefined &&
      props.personChild.SUB_DEPARTMENT_ID !== null &&
      props.personChild.SUB_DEPARTMENT_ID !== "" &&
      props.personChild.DEPARTMENT_ID !== undefined &&
      props.personChild.DEPARTMENT_ID !== null &&
      props.personChild.DEPARTMENT_ID !== ""
    ) {
      loadData(
        listItems.data?.filter(
          (a) =>
            parseInt(a.DEPARTMENT_ID) ===
              parseInt(props.personChild.DEPARTMENT_ID) &&
            parseInt(a.SUB_DEPARTMENT_ID) ===
              parseInt(props.personChild.SUB_DEPARTMENT_ID)
        )
      );
    } else if (
      props.personChild.SUB_DEPARTMENT_ID !== undefined &&
      props.personChild.SUB_DEPARTMENT_ID !== null &&
      props.personChild.SUB_DEPARTMENT_ID !== ""
    ) {
      loadData(
        listItems.data?.filter(
          (a) =>
            parseInt(a.SUB_DEPARTMENT_ID) ===
            parseInt(props.personChild.SUB_DEPARTMENT_ID)
        )
      );
    } else if (
      props.personChild.DEPARTMENT_ID !== undefined &&
      props.personChild.DEPARTMENT_ID !== null &&
      props.personChild.DEPARTMENT_ID !== ""
    ) {
      loadData(
        listItems.data?.filter(
          (a) =>
            parseInt(a.DEPARTMENT_ID) ===
            parseInt(props.personChild.DEPARTMENT_ID)
        )
      );
    } else loadData(listItems.data);
  }, []);

  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.COMPARTMENT_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ COMPARTMENT_ID: text.target.value, check: false },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.COMPARTMENT_ID}>
            {nation.COMPARTMENT_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Positionlevel(props) {
  const [data, loadData] = useState(null);
  useEffect(async () => {
    let listItems = await axios(
      "http://hr.audit.mn/hr/api/v1/library/positionlevel"
    );
    loadData(listItems.data);
  }, []);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        className="anketInput"
        value={props.personChild?.POSITION_LEVEL_ID}
        onChange={(text) =>
          props.setPersonChild({
            ...props.personChild,
            ...{ POSITION_LEVEL_ID: text.target.value, check: false },
          })
        }
      >
        {data?.map((nation, index) => (
          <option key={index} value={nation.POSITION_LEVEL_ID}>
            {nation.POSITION_LEVEL_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function DateInput(props) {
  const [dateShow, setDateShow] = useState(
    props.data?.dateValue !== undefined
      ? dateFormat(new Date(props.data?.dateValue), "yyyy-mm-dd")
      : ""
  );
  useEffect(() => {
    props.setData({
      ...props.data,
      ...{ [props.data.dateValue]: dateFormat(dateShow, "dd-mmm-yy") },
    });
  }, [dateShow]);

  let listItems;
  if (dateShow !== undefined) {
    listItems = (
      <input
        type="date"
        disabled={props.edit}
        className="anketInput"
        value={dateShow}
        onChange={(date) => {
          setDateShow(date.target.value);
        }}
      ></input>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function DateInputArray(props) {
  const [dateShow, setDateShow] = useState(
    props.data?.dateValue !== undefined
      ? dateFormat(new Date(props.data?.Birth), "yyyy-mm-dd")
      : ""
  );
  useEffect(() => {
    props.setData({
      ...props.data,
      ...{ [props.data.dateValue]: dateFormat(dateShow, "dd-mmm-yy") },
    });
  }, [dateShow]);

  let listItems;
  if (dateShow !== undefined) {
    listItems = (
      <input
        className=""
        type="date"
        id="start"
        disabled={props.edit}
        className="anketInput"
        value={dateShow}
        min="1930-01-01"
        max="2021-12-31"
        onChange={(date) => {
          setDateShow(date.target.value);
        }}
      ></input>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
export {
  National,
  Subnational,
  Dynasty,
  Office,
  Suboffice,
  FamilyArray,
  Examtype,
  Edutype,
  Fametype,
  Subfametype,
  Forcetype,
  Language,
  Languagetype,
  Literaturetype,
  DateInput,
  DateInputArray,
  DepartmentID,
  Subdepartment,
  Compartment,
  Positionlevel,
};
