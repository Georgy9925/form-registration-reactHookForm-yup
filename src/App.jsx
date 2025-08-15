import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import styles from './app.module.css'

const formSchema = yup.object().shape({
	email: yup.string().required('Email обязателен').email('Некорректный email. Email может содержать латиницу, цифры, специальные символы( @, -, _ )'),
	password: yup.string().required('Пароль обязателен').min(6, 'Пароль должен быть не менее 6 символов'),
	confirmPassword: yup.string().required('Подтвердите пароль').oneOf([yup.ref('password')], 'Пароли должны совпадать')
})

function App() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset
	} = useForm({
		mode: 'onChange',
		resolver: yupResolver(formSchema)
	})

	const onSubmit = (data) => {
		console.log('Форма отправлена:', data)
		reset()
	}

	return (
		<div className={styles.app}>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="email" className={styles.label}>Email</label>
					<input
						id="email"
						type="email"
						{...register('email')}
						className={`${styles.input} ${errors.email ? styles.error : ''}`}
						placeholder="example@mail.com"
					/>
					{errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="password" className={styles.label}>Пароль</label>
					<input
						id="password"
						type="password"
						{...register('password')}
						className={`${styles.input} ${errors.password ? styles.error : ''}`}
						placeholder="Не менее 6 символов"
					/>
					{errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="confirmPassword" className={styles.label}>Подтвердите пароль</label>
					<input
						id="confirmPassword"
						type="password"
						{...register('confirmPassword')}
						className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
						placeholder="Повторите пароль"
					/>
					{errors.confirmPassword && (
						<span className={styles.errorText}>{errors.confirmPassword.message}</span>
					)}
				</div>

				<button
					type="submit"
					disabled={!isValid}
					className={styles.button}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	)
}

export default App
