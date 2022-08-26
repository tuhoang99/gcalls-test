import { FormControl, FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { Controller } from 'react-hook-form';

export interface InputCustomModel {
  field: string;
  label?: string | undefined;
  touched?: any | undefined;
  errors?: any | undefined;
  values?: string | undefined;
  handleBlur?: any | undefined;
  handleChange?: any | undefined;
  control?: any | undefined;
  register?: any;
  setValue?: any | undefined;
}

const InputCustom: React.FC<InputCustomModel> = (props) => {
  const { field, label, errors, control } = props;

  return(
    <FormControl fullWidth error={Boolean(!!errors)}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={field}
        control={control}
        defaultValue=''
        render={({ field: { onChange, onBlur, value }}) => (
          <OutlinedInput
            label={label}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            type="text"
            inputProps={{}}
          />
        )}
      />
      {errors && <FormHelperText error>{errors.message}</FormHelperText>}
    </FormControl>
  )
}

export default InputCustom;