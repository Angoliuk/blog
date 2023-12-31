import { useForm as useHookForm, zodResolver } from "blog/utils/form";
import { useMemo } from "react";
import { z } from "zod";

export type FormValues = z.infer<ReturnType<typeof useValidation>>;

const defaultValues: FormValues = {
  title: "",
  description: "",
};

const useValidation = () => {
  return useMemo(
    () =>
      z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(600),
      }),
    []
  );
};

export const useForm = (initialValues?: FormValues | null) => {
  return useHookForm({
    defaultValues: initialValues ?? defaultValues,
    resolver: zodResolver(useValidation()),
  });
};
