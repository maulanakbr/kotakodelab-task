# Kotakodelab Take Home Test

## Requirements Checklist - API

- [x] Should be able to create Staff
- [x] Should be able to update Staff
- [x] Staff should be able to login
- [x] Staff should be able to logout
- [x] Staff should not be able to update another staff data
- [x] Staff should be able to clock in
- [x] Staff should be able to clock out

## Requirements Checklist - CLIENT

- [x] Staff should be able to login
- [x] Staff should be able to logout
- [x] Staff should be able to see another staff
- [x] Staff should be able to update the staff data
- [x] Staff should not be able to update another staff data
- [x] Staff should be able to clock in
- [x] Staff should be able to clock out

## Improvements

- **Implement TurboRepo for FastCharge the Development**:

  - Utilize TurboRepo to enhance development efficiency by managing and optimizing monorepo workflows.

- **Attendance Service**:

  - Update the `AttendanceService` to consider the company's latitude and longitude for clock-in and clock-out validation or adjustments.

- **Company Service**:

  - Provide functionality in the `CompanyService` to manage unique company latitude and longitude.

- **Adjust Staff Entity and Add Role**:
  - Modify the `Staff` entity to include a `role` field, allowing differentiation between various types of staff members.
    - **Roles**:
      - `superadmin`: A role with the highest level of access and control.
      - `staff`: A standard role with typical staff permissions.

## Installation Instructions

**Clone the Repository**

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd kotakodelab-task
yarn install
yarn dev
```
