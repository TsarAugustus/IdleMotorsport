export default class Technology {

    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        this.difficulty = config.difficulty;
        this.influences = config.influences || {};
        this.discovered = false;
        this.discoveredBy = null;
        this.discoveredYear = null;
        this.provenness = 0;
        this.adopters = [];
    }

}
