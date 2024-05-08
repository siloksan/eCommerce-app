// import Input from 'components/Input/Input';
// import { useFormContext } from 'react-hook-form';

// const customerFields = {
//   email: {
//     name: 'email',
//     type: 'input',
//   },
//   password: {
//     name: 'password',
//     type: 'input',
//   },
//   firstName: {
//     name: 'firstName',
//     type: 'input',
//   },
//   lastName: {
//     name: 'lastName',
//     type: 'input',
//   },
//   dateOfBirth: {
//     name: 'dateOfBirth',
//     type: 'input',
//   },
// };

// function CustomerForm() {
//   const { register } = useFormContext();

//   const fields = Object.entries((field) => {
//     return <Input />;
//   });
//   return (
//     <div>
//       <label>
//         E-mail
//         <input {...register(customerFields.email.name)} type="text" />
//       </label>
//       <label>
//         Password
//         <input {...register(FormField.password)} type="text" />
//       </label>
//       <label>
//         First Name
//         <input {...register(FormField.firstName)} type="text" />
//       </label>
//       <label>
//         Last Name
//         <input {...register(FormField.lastName)} type="text" />
//       </label>
//       <label>
//         Date of birth
//         <input {...register(FormField.dateOfBirth)} type="text" />
//       </label>
//     </div>
//   );
// }

// export default CustomerForm;
