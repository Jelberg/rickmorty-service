import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsTimeLessThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isTimeLessThan',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, any>)[
            relatedPropertyName
          ];

          if (!value || !relatedValue) {
            return false; // Return false if value or relatedValue is not set
          }

          const [minutes1, seconds1] = [value.minutes, value.seconds];
          const [minutes2, seconds2] = [
            relatedValue.minutes,
            relatedValue.seconds,
          ];

          // Compare times: first by minutes, then by seconds
          return (
            minutes1 < minutes2 ||
            (minutes1 === minutes2 && seconds1 < seconds2)
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should be less than ${args.constraints[0]}`;
        },
      },
    });
  };
}
