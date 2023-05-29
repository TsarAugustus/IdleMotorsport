function attemptFacultyBuy(type, facultyArray) {
    let facultyOfType = facultyArray.filter(member => member.type === type);
    
    let member = {};
    let potentialMember = {};

    //MAKE SURE FACULTY HAVE AN ORIGINAL X/Y POSITION TO REFER TO
    //MAKE FACULTY MOVE TO TEAM X/Y POSITION
    facultyOfType.forEach(thisMember => potentialMember = facultyCheck(potentialMember, thisMember));
    
    member = potentialMember;
    return member;
}

function facultyCheck(potentialMember, thisMember) {
    let newMember = {};
    let affordable = true;

    if(!potentialMember.name) newMember = thisMember;
    else if(affordable) newMember = thisMember

    return newMember;
}

export { attemptFacultyBuy }