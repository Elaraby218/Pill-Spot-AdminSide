import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema } from "./validation";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../components/input";
import { AiFillAudio } from "react-icons/ai";


type TFormIntput = z.infer<typeof signUpSchema> ;  

const ReactFormm = () => {
  const { register, handleSubmit , formState : {errors} } = useForm<TFormIntput>({mode:"onChange",resolver: zodResolver(signUpSchema) });

  const submitData: SubmitHandler<TFormIntput> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitData)} className="w-md mx-auto">
      <TextInput name="firstName" errors={errors} label="First Name" register={register} >
        <AiFillAudio/>
      </TextInput>


      <TextInput name="lastName" errors={errors} label="Last Name" register={register}>
      </TextInput>
      
      <TextInput name="email" errors={errors} label="Email" register={register}></TextInput>
      
      <TextInput name="password" errors={errors} label="Password" register={register} type="password"></TextInput>


        <button type="submit" className="btn">Primary Button</button>
      
    </form>
  );
};

export default ReactFormm;
