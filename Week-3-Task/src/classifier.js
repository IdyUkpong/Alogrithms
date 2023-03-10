function classifier(input) {
  if (!Array.isArray(input)) {
    throw new Error();
  }

  if (input.length === 0) {
    return { noOfGroups: 0 };
  }

  let objGroup = {};
  let memberHolder = [];
  let member = [];

  let copyInput = [...input];

  let sortedAge = copyInput.map((member) => {
    let age = 2019 - new Date(member.dob).getFullYear();
    return { ...member, age };
  });

  let sortedInput = sortedAge.sort((a, b) => a.age - b.age);

  member.push(sortedInput[0]);

  for (let i = 1; i < sortedInput.length; i++) {
    if (sortedInput[i].age - member[0].age <= 5 && member.length < 3) {
      member.push(sortedInput[i]);
    } else {
      memberHolder.push(member);
      member = [];
      member.push(sortedInput[i]);
    }
  }

  if (member.length > 0) {
    memberHolder.push(member);
  }

  objGroup.noOfGroups = memberHolder.length;

  for (let i = 0; i < memberHolder.length; i++) {
    objGroup[`group${i + 1}`] = {
      members: memberHolder[i],
      oldest: memberHolder[i][memberHolder[i].length - 1].age,
      sum: memberHolder[i].reduce(
        (accumulator, currentvalue) => accumulator + currentvalue.age,
        0
      ),
      regNos: memberHolder[i]
        .map((element) => +element.regNo)
        .sort((a, b) => a - b),
    };
  }

  return objGroup;
}

export default classifier;
