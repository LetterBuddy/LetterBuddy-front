import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/button/Button";
import InputForm from "../ui/inputForm/InputForm";
import Label from "../ui/label/Label";
import axiosAPI from "../../axiosAPI";
import { signUpSchema } from "../../components/auth/SignUp";
import useChildStore from "../../store/useChildStore";
import useLoadingStore from "../../store/useLoadingStore";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../ui/modal/Modal";

const addChildScema = signUpSchema.omit({ email: true });

type AddChildFormInput = z.infer<typeof addChildScema>;

interface AddChildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddChildModal = ({ isOpen, onClose }: AddChildModalProps) => {
  const { addChild } = useChildStore();
  const { isLoading, setIsLoading } = useLoadingStore();

  if (!isOpen) return null;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AddChildFormInput>({
    resolver: zodResolver(addChildScema),
  });

  const handleAddChild = async (data: AddChildFormInput) => {
    try {
      setIsLoading(true);
      const response = await axiosAPI.post("/accounts/child/", data);
      const addedChild = response.data;
      console.log("Child user added successfully:", addedChild);
      addChild(addedChild);
      onClose();
    } catch (error: any) {
      console.error("Error adding child user:", error.response.data);
      const errorData = error.response.data;

      Object.keys(errorData).forEach((key) => {
        if (Array.isArray(errorData[key])) {
          setError(key as keyof AddChildFormInput, {
            message: errorData[key].join(" "),
          });
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} backdropClickCloses={true}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit(handleAddChild)}
      >
        <Label>Add a new child user</Label>
        <InputForm
          type="text"
          placeholder="First Name"
          {...register("first_name")}
        />
        {errors?.first_name && <span>{errors.first_name.message}</span>}
        <InputForm
          type="text"
          placeholder="Last Name"
          {...register("last_name")}
        />
        {errors?.last_name && <span>{errors.last_name.message}</span>}
        <InputForm
          type="text"
          placeholder="User Name"
          autoComplete="username"
          {...register("username")}
        />
        {errors?.username && <span>{errors.username.message}</span>}
        <InputForm
          type="password"
          placeholder="Child's Password"
          autoComplete="new-password"
          {...register("password")}
        />
        {errors?.password && <span>{errors.password.message}</span>}
        {!isLoading ? (
          <Button type="submit">Add Child</Button>
        ) : (
          <div style={{ margin: "2.5rem" }}>
            <ClipLoader />
          </div>
        )}
      </form>
    </Modal>
  );
};

export default AddChildModal;
