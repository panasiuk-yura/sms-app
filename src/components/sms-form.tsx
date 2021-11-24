import { useForm, SubmitHandler, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import styles from './sms-form.module.css'
import "react-phone-number-input/style.css";
import { formTextData } from './sms-form-text-data'
import { SendMessage } from '../api/api'

type Inputs = {
  phoneInput: string;
  text: string;
};

export const SmsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    SendMessage(
      {
        messageTo: data.phoneInput,
        messageBody: data.text
      })
    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label>{formTextData.LABEL_PHONE}</label>
      <Controller
        name="phoneInput"
        control={control}
        rules={{
          validate: (value) => isValidPhoneNumber(value),
          required: true
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            value={value}
            onChange={onChange}
            defaultCountry="US"
            id="phoneInput"
          />
        )}
      />
      {errors["phoneInput"] && (
        <p className={styles.errorMessage}>{formTextData.ERROR_INVALID_PHONE}</p>
      )}
      <label>{formTextData.LABEL_MESSAGE_TEXT}</label>
      <input
        {...register("text",
          {
            minLength: { value: 2, message: formTextData.ERROR_MIN_LENGTH },
            required: { value: true, message: formTextData.ERROR_TEXT_REQUIRED }
          })}
      />
      {errors.text && <p className={styles.errorMessage}>{errors.text.message}</p>}
      <input type="submit" />
    </form>
  )
}