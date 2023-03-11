import { FC, useEffect, useState } from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import cn from 'classnames';
import { useSignUpMutation } from '../../redux/auth-api';
import { Button } from '../button/button';
import {ReactComponent as EyeOpen} from '../../assets/eye-open.svg';
import {ReactComponent as EyeClosed} from '../../assets/eye-closed.svg';
import {ReactComponent as SuccesIcon} from '../../assets/success.svg';
import { Highlight } from '../highlight/highlight';
import { ISignUp } from '../../types/user';
import { useAppDispatch } from '../../hooks/hooks';

import style from './auth.module.css'
import { setUser } from '../../redux/slices/user-slice';

export const SignUp: FC = () => {
    const [step, setStep] = useState(1);
    const [blur, setBlur] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState<'password' | 'text'>('password');
    const [signUp, {data: userData, isSuccess, isError, isLoading}] = useSignUpMutation()
    const dispatch = useAppDispatch();

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm<ISignUp>({mode: 'onChange'});

    const onSubmit: SubmitHandler<ISignUp> = async(data) => {
        if(step === 3 && data) {
            await signUp(data).unwrap();
            return
        }
        setStep(prev => prev + 1)
    };

    
    useEffect(() => {
        if(isSuccess && userData) {
           dispatch(setUser(userData))
        }
    }, [isSuccess, dispatch, userData])
    
    return (
        <div className={style.auth}>
            <h1>Cleverland</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>

                <div className={style.titles}>
                    <h2 className={style.title}>Регистрация</h2>
                    <p className={style.step}>{step} шаг из 3</p>
                </div>

                {step === 1 && 
                    <div className={style.inputWrap}>
                        <div className={cn(style.inputContainer, {[style.error]: errors.username && blur})}>
                            <input
                                onFocus={() => setBlur(false)}
                                value={username}
                                type='text' 
                                id='username'
                                {...register('username', {
                                    required: 'Поле не может быть пустым',
                                    pattern: /^((\d+[a-z]+)|([a-z]+\d+))\w*$/i,
                                    onChange: (e) => setUsername(e.target.value),
                                    onBlur: () => setBlur(true),
                                }
                                )} 
                                placeholder=' '
                                />
                            <label htmlFor='username'>Придумайте логин для входа</label>
                            <div className={cn(style.hint, {[style.error]: errors.username && blur})}>
                                {errors?.username && 
                                    (errors?.username.type === 'pattern' 
                                        ? <Highlight 
                                            text='Используйте для логина латинский алфавит и цифры' 
                                            search={(/^\d+$/).test(username) 
                                                ? 'латинский алфавит' 
                                                : (/^[a-z]+$/i).test(username)
                                                    ? 'цифры'
                                                    : (/^((\d+[a-z]+)|([a-z]+\d+))\w*$/i).test(username)
                                                        ? ''
                                                        : 'Используйте для логина латинский алфавит и цифры'
                                                }
                                            />
                                        : <span className={cn({[style.error]: errors.username && blur})}>
                                            {errors?.username.message}
                                            </span>
                                    )
                                }
                            </div>
                        </div>
                        
                        <div className={cn(style.inputContainer, {[style.error]: errors.password && blur})}>
                            <input
                                onFocus={() => setBlur(false)}
                                type={type}
                                id='password' 
                                {...register('password', {
                                    required: 'Поле не может быть пустым',
                                    pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[0-9]).{8,}/,
                                    onChange: (e) => setPassword(e.target.value),
                                    onBlur: () => setBlur(true),
                                })}
                                placeholder=' '
                            />
                            <label htmlFor='password'>Пароль</label>
                            
                            <button 
                                type='button' 
                                onClick={() => type === 'text' ? setType('password') : setType('text')}
                                className={style.eyeBtn}
                            >
                                {type === 'password' ? <EyeClosed /> : <EyeOpen />}
                            </button>
                            <SuccesIcon 
                                className={cn(style.successIcon, {
                                    [style.visible]: password.length > 0 && !errors.password,
                                    })}
                                />
                            <div className={cn(style.hint, {[style.error]: errors.password && blur})}>
                                {errors?.password && 
                                    (errors?.password.type === 'pattern'
                                        ? <Highlight 
                                            text='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                                            search={(/^[a-zа-я]+$/).test(password)
                                                    ? 'не менее 8 символов|заглавной буквой|цифрой'
                                                    : (/^[a-zа-яA-ZА-Я]+$/).test(password)
                                                        ? 'не менее 8 символов|цифрой'
                                                        : (/^[a-zа-я0-9]+$/).test(password)
                                                            ? 'не менее 8 символов|заглавной буквой'
                                                            : (/^[a-zа-яA-ZА-Я0-9]+$/).test(password)
                                                                ? 'не менее 8 символов'
                                                                : 'Пароль не менее 8 символов, с заглавной буквой и цифрой' 
                                            }
                                            />
                                        : <span>
                                                {errors?.password.message}
                                            </span>)
                                }
                                
                            </div>
                        </div>
                    </div>
                }

                {step === 2 &&
                    <div className={style.inputWrap}>
                        <div className={cn(style.inputContainer, {[style.error]: errors.firstName})}>
                            <input
                                id='firstName'
                                type='text' 
                                {...register('firstName', {
                                    required: 'Поле не может быть пустым'
                                })}
                                placeholder=' '
                            />
                            <label htmlFor='firstName'>Имя</label>
                            <div className={cn(style.hint, {[style.error]: errors.firstName})}>
                                {errors?.firstName && errors.firstName.message}
                            </div>
                        </div>
                        <div className={cn(style.inputContainer, {[style.error]: errors.lastName})}>
                            <input
                                id='lastName'
                                type='text' 
                                {...register('lastName', {
                                    required: 'Поле не может быть пустым'
                                })}
                                placeholder=' '
                            />
                            <label htmlFor='lastName'>Фамилия</label>
                            <div className={cn(style.hint, {[style.error]: errors.lastName})}>
                                {errors?.lastName && errors.lastName.message}
                            </div>
                        </div>
                    </div>
                }
                
                {step === 3 &&
                    <div className={style.inputWrap}>
                        <div className={cn(style.inputContainer, {[style.error]: errors.phone})}>
                            <input
                                id='phone'
                                type='text' 
                                {...register('phone', {
                                    required: 'Поле не может быть пустым'
                                })}
                                placeholder=' '
                            />
                            <label htmlFor='phone'>Номер телефона</label>
                            <div className={cn(style.hint, {[style.error]: errors.phone})}>
                                {errors?.phone && errors.phone.message}
                            </div>
                        </div>
                        <div className={cn(style.inputContainer, {[style.error]: errors.email})}>
                            <input
                                id='email'
                                type='text' 
                                {...register('email', {
                                    required: 'Поле не может быть пустым',
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                        message: 'Введите корректный e-mail'
                                    }
                                })}
                                placeholder=' '
                            />
                            <label htmlFor='email'>E-mail</label>
                            <div className={cn(style.hint, {[style.error]: errors.email})}>
                                {errors?.email && errors.email.message}
                            </div>
                        </div>
                    </div>
                }
                
                <Button size='large' type='submit'>
                    {step === 1 && 'следующий шаг'}
                    {step === 2 && 'последний шаг'}
                    {step === 3 && 'зарегистрироваться'}
                </Button>

                <div>
                    Есть учетная запись?
                </div>
            </form>
        </div>
    )
}