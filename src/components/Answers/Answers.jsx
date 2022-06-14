import React, { useState, useEffect } from "react";
import "./Answer.styles.scss";

const Answers = ({ casesList, triggersList }) => {
  const [triggersListState, setTriggersListState] = useState([]);

  useEffect(() => {
    const filteredList = triggersList.filter((item) => !!item);
    setTriggersListState((prevState) => [
      ...new Set([...filteredList, ...prevState]),
    ]);
  }, [triggersList]);

  console.log(casesList);

  const foundedItemsCount = casesList.reduce((acc, item) => {
    if (triggersListState.includes(item.trigger)) {
      acc.push(item.trigger);
    }
    return acc;
  }, []).length;

  return (
    <div className="answers">
      <h2>
        Вы нашли {foundedItemsCount} / {casesList.length} кейсов
      </h2>
      {casesList.map((item, idx) => {
        return (
          <div className="answers__item" key={idx}>
            <span className="answers__item-header">Кейс - </span>
            {triggersListState.includes(item.trigger) ? (
              <span>{item.text}</span>
            ) : (
              <span>????</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
