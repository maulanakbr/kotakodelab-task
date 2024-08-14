import { HttpStatus } from '@nestjs/common';
import ApiError from './ApiError';

/**
 * Admin-Related Errors
 */
export const NoStaffFoundError = () => {
  throw new ApiError(
    HttpStatus.NOT_FOUND,
    'Staff not found',
    'Staff with the specified ID is not found',
  );
};

export const StaffAlreadyExistsError = () => {
  throw new ApiError(
    HttpStatus.CONFLICT,
    'Staff already exists',
    'There already exists a staff with this email',
  );
};

export const RoleNotMatchError = () => {
  throw new ApiError(
    HttpStatus.FORBIDDEN,
    'Role not match',
    'Role with the specified ID is not match',
  );
};

/**
 * Attendance-Related Errors
 */
export const NoAttendanceRecordFoundError = () => {
  throw new ApiError(
    HttpStatus.NOT_FOUND,
    'No attendance record',
    'No attendance record found for the specified attendance ID',
  );
};

export const LocationNotMatchError = () => {
  throw new ApiError(
    HttpStatus.FORBIDDEN,
    'Location not match',
    "The latitude or longitude provided do not match the company's current location",
  );
};

export const AttendanceAlreadyFulfilledError = () => {
  throw new ApiError(
    HttpStatus.CONFLICT,
    'Attendance already fullfilled',
    'Attendance record is already fulfilled with a clock-out or clock-in time',
  );
};

/**
 * Company-Related Errors
 */
export const CompanyAlreadyExistsError = () => {
  throw new ApiError(
    HttpStatus.CONFLICT,
    'Company already exists',
    'There already exists a company with this name',
  );
};

/**
 * Auth-Related Errors
 */

export const WrongPasswordError = () => {
  throw new ApiError(
    HttpStatus.UNAUTHORIZED,
    'Wrong password',
    'The password you provided is incorrect',
  );
};
