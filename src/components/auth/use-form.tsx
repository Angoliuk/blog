import { useForm as useHookForm, zodResolver } from "blog/utils/form";
import { useMemo } from "react";
import { z } from "zod";

export type FormValues = z.infer<ReturnType<typeof useValidation>>;

const defaultValues: FormValues = {
  email: "",
  password: "",
};

const useValidation = () => {
  return useMemo(
    () =>
      z.object({
        email: z.string().min(1).max(25),
        password: z.string().min(1).max(50),
      }),
    []
  );
};

export const useForm = () => {
  return useHookForm({
    defaultValues: defaultValues,
    resolver: zodResolver(useValidation()),
  });
};
