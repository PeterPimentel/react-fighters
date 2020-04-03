import Fighter from './Fighter'

class Joe extends Fighter {
    constructor(id, name, image, life, factory, skills){
        super(id, name, image, life, factory)
        this.skills = skills.map(skill => {
            if(skill.id === 2){
                return {
                    ...skill,
                    damage: this.hurricaneUpper

                }
            }else{
                return {
                    ...skill,
                    damage : () => skill.damage
                }
            }
        })

    }

    hurricaneUpper(){
        return this.energy * 5
    }
}

export default Joe
