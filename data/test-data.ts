export default class TestData {
  static makeAppointmentTestData() {
    return [
      {
        testID: "TC001",
        facility: "Hongkong CURA Healthcare Center",
        hcp: "Medicare",
        date: "24/02/2026",
      },
      {
        testID: "TC002",
        facility: "Tokyo CURA Healthcare Center",
        hcp: "Medicaid",
        date: "25/02/2026",
      },
      {
        testID: "TC003",
        facility: "Seoul CURA Healthcare Center",
        hcp: "None",
        date: "26/02/2026",
      },
    ];
  }

 static apiUserCreation() {
    return [
      {
        name: "John Doe",
        job: "Software Engineer",
        id: "126",
        createdAt: "2026-02-27T10:13:43.039Z",
      },
    ];
  }
}
