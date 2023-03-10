function findDuplicateTransactions(transactions) {
  let duplicateTransactions = [...transactions];
  if (transactions.length == 1) {
    return [];
  }
  if (!Array.isArray(transactions)) {
    throw Error("Invalid");
  }
  //Group similar objects together by comparing properties
  let compareGroup = [];
  for (let i = 0; i < duplicateTransactions.length; i++) {
    let sortedArray2 = [];
    const {
      sourceAccount: sourceAccountI,
      targetAccount: targetAccountI,
      category: categoryI,
      amount: amountI,
    } = duplicateTransactions[i];
    for (let j = i; j < duplicateTransactions.length; j++) {
      const {
        sourceAccount: sourceAccountJ,
        targetAccount: targetAccountJ,
        category: categoryJ,
        amount: amountJ,
      } = duplicateTransactions[j];
      let num = duplicateTransactions.findIndex((transaction) => {
        
        return (
          transaction.sourceAccount === sourceAccountI &&
          transaction.targetAccount == targetAccountI &&
          transaction.amount == amountI &&
          transaction.category == categoryI
        );
      });
     
      if (num == i) {
        if (
          sourceAccountI === sourceAccountJ &&
          targetAccountI === targetAccountJ &&
          amountI === amountJ &&
          categoryI === categoryJ
        ) {
          sortedArray2.push(duplicateTransactions[j]);
        }
      } else continue;
    }
  
    if (sortedArray2.length > 0) {
      compareGroup.push(sortedArray2);
    }
  }

  compareGroup;

  //Sort objects in each sub-array by time of occurence
  let sortedArray = [];
  for (let i = 0; i < compareGroup.length; i++) {
    let sortedArr = compareGroup[i].sort((a, b) => {
      let aTime = Math.floor(new Date(a.time).getTime() / 1000);
      let bTime = Math.floor(new Date(b.time).getTime() / 1000);
      return aTime - bTime;
    });
    sortedArray.push(sortedArr);
  }
  sortedArray;
  //Filter to remove empty arrays
  let filtered = sortedArray.filter((element) => {
    return element.length !== 1;
  });

  filtered;

  //Remove more than 60 secs interval transactions
  let solutionArray = [];
  filtered.forEach((subArray) => {
    let hold = [];
    for (let j = 0; j < subArray.length - 1; j++) {
      let currentTime = Math.floor(new Date(subArray[j].time).getTime() / 1000);
      let nextTime = Math.floor(
        new Date(subArray[j + 1].time).getTime() / 1000
      );
      if (subArray.length < 3) {
        if (j < 2 && nextTime - currentTime <= 60) {
          hold.push(subArray[j]);
          hold.push(subArray[j + 1]);
        } else continue;
      } else if (subArray.length > 2) {
        if (Math.abs(currentTime - nextTime) <= 60) {
          hold.push(subArray[j]);
          if (j == subArray.length - 2) {
            hold.push(subArray[j + 1]);
          }
        } else if (
          j >= 2 &&
          Math.abs(currentTime - nextTime) > 60 &&
          Math.abs(
            currentTime -
              Math.floor(new Date(subArray[j - 1].time).getTime() / 1000)
          ) <= 60
        ) {
          hold.push(subArray[j]);
        } else;
      }
    }
    if (hold.length > 0) {
      solutionArray.push(hold);
    }
  });
  solutionArray.sort((a, b) => {
    return a[0].id - b[0].id;
  });
  return solutionArray;
}



export default findDuplicateTransactions;
