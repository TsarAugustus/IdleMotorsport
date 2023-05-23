let facultyTypes = {
    ENGINEER: createENGINEER,
    CEO: createCEO,
    PRINCIPAL: createPRINCIPAL,
    CREW: createCREW,
    MECHANIC: createMECHANIC,
    STRATEGIST: createSTRATEGIST
}

function createFaculty(num, setup) {
    let member = createMember(facultyTypes, setup, num);

    return member;
}

function createMember(facultyTypes, setup, num) {
    let facultyTypesKeys = Object.keys(facultyTypes)
    let thisType = facultyTypesKeys[randomNumber(0, facultyTypesKeys.length - 1)];

    let member  = {
        name: `Member ${num}-${thisType}`,
        type: thisType,
        skills: {},
        tier: setup.tiers,
        active: false,
        xPosition: randomNumber(0, setup.maxX - 1),
        yPosition: randomNumber(0, setup.maxY - 1)
    }

    member = evaluateNewMember(member);

    return member
}

function evaluateNewMember(member) {
    let memberFunction = facultyTypes[member.type];
    member = memberFunction(member)

    return member;
}

//Very redundant, okay for now
/* ************************ */
function createENGINEER(member) {
    member.skills.engineerSkill = randomNumber(1, 10);

    return member;
}

function createCEO(member) {
    member.skills.ceoSkill = randomNumber(1, 10);

    return member;
}

function createPRINCIPAL(member) {
    member.skills.principalSkill = randomNumber(1, 10);

    return member;
}

function createCREW(member) {
    member.skills.crewSkill = randomNumber(1, 10);

    return member;
}

function createMECHANIC(member) {
    member.skills.mechanicSkill = randomNumber(1, 10);

    return member;
}

function createSTRATEGIST(member) {
    member.skills.strategistSkill = randomNumber(1, 10);

    return member;
}

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export { createFaculty };