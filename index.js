// Your code here
function createEmployeeRecord(employeeArray){
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date,time] = dateStamp.split("");
    const [year, month, day] = date.split("-")
    const [hour, minute] = time.split(":");

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: `${year}-${month}-${day}`
    };

    employeeRecord.timeInEvents.push(timeInEvent);

    return employeeRecord;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: `${year}-${month}-${day}`
    };
    
    employeeRecord.timeOutEvents.push(timeOutEvent);
    
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour);
      return hoursWorked;
    }
  
    return 0; 
  }
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
  }
  function allWagesFor(employeeRecord) {
    const timeInEvents = employeeRecord.timeInEvents;
    let totalWages = 0;
  
    for (const timeInEvent of timeInEvents) {
      const date = timeInEvent.date;
      const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
      totalWages += wagesEarned;
    }
  
    return totalWages;
  }
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
  
    for (const employeeRecord of employeeRecords) {
      const totalWages = allWagesFor(employeeRecord);
      totalPayroll += totalWages;
    }
  
    return totalPayroll;
  }