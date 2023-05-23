function attemptFacultyBuy(type, facultyArray) {
    let facultyOfType = facultyArray.filter(member => member.type === type);

    let member = {};
    let potentialMember = {};

    //MAKE SURE FACULTY HAVE AN ORIGINAL X/Y POSITION TO REFER TO
    //MAKE FACULTY MOVE TO TEAM X/Y POSITION
    facultyOfType.forEach(member => {
        let affordable = true;

        if(!potentialMember.name) potentialMember = member;
        else if(affordable) potentialMember = member
    });

    member = potentialMember;

    return member;
}

export { attemptFacultyBuy }