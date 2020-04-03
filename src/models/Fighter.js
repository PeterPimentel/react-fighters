class Fighter {
    constructor(id, name, image, life, factory, skills) {
        this.id = id
        this.name = name
        this.image = image
        this.life = life
        this.damageReceived = 0
        this.energy = 0
        this.factory = factory
        this.skills = skills
    }
}

export default Fighter
