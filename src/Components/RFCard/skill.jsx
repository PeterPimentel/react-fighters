import React from 'react';

import { Icon, Label} from 'semantic-ui-react'

export default function Skill({skill, handleAttack, myTurn, className}) {
  const handleClick = (skill) => {
    if(myTurn){
      handleAttack(skill)
    }else{
      console.log("Wait for your Turn")
    }
  }
  return (
    <div className={`${className}`}>
      <Label onClick={() => handleClick(skill)} as='a' color='grey' image>
        {skill.cost} <Icon name='sun'/>{skill.name}
        <Label.Detail>{skill.damage}</Label.Detail>
      </Label>
    </div>
  );
}
