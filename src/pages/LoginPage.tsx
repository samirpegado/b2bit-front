import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '../context/UserAuth';

type LoginFormInputs = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Este campo é obrigatório.'),
  password: Yup.string().required('Este campo é obrigatório.'),
});

const LoginPage: React.FC = () => {
  const { loginUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(validationSchema) });

  const handleLogin = (form: LoginFormInputs) => {
    loginUser(form.email, form.password);
  };

  return (
    <section>      
      <div className="flex flex-col  justify-center items-center h-screen bg-[#fafafa] ">
        <div className="rounded-[18px] m-8 drop-shadow-[0_64px_64px_rgba(0,0,0,0.25)]  sm:w-[438px]   bg-white">
          <div className="px-[26px] py-[38px]">
            <div className='w-full flex justify-center'>
              <img className='w-[309.6px] pt-9' srcSet="assets/b2bit_logo.png" />

            </div>
            
           
            <form className="space-y-4 md:space-y-6 pt-[26px]" onSubmit={handleSubmit(handleLogin)}>
              <div>
                <label htmlFor="email" className="font-body text-lg font-bold ">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"                 
                  className="email w-full h-[52.25px] bg-[#f1f1f1] rounded-lg px-4 font-body text-base text-gray-500 focus:outline-gray-200 email" 
                  placeholder="@gmail.com"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="font-body text-lg font-bold password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="•••••••••••"
                  className="password w-full h-[52.25px] bg-[#f1f1f1] rounded-lg px-4 font-body text-base font-bold text-gray-500 focus:outline-gray-200"
                  {...register('password')}
                />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              </div>
              <div className='pt-4'>
                <button type="submit" className="signin w-full h-[52.25px] bg-[#02274F] rounded-lg font-body text-lg font-bold  text-[#FAFAFA]">
                  Sign in
                </button>
              </div> 
            
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
