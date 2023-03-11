import { FC, useEffect, useState } from 'react'
import cn from 'classnames';
import {useForm, SubmitHandler} from 'react-hook-form'
import { Button } from '../button/button';
import {ReactComponent as EyeOpen} from '../../assets/eye-open.svg';
import {ReactComponent as EyeClosed} from '../../assets/eye-closed.svg';
import { useSignInMutation } from '../../redux/auth-api';
import { ISignIn } from '../../types/user';
import { useAppDispatch } from '../../hooks/hooks';

import style from './auth.module.css'
import { setUser } from '../../redux/slices/user-slice';

export const Auth: FC = () => {
    const [type, setType] = useState<'password' | 'text'>('password')
    const [signIn, {data: userData, isSuccess, isError, isLoading, error}] = useSignInMutation()
    const dispatch = useAppDispatch();

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
    } = useForm<ISignIn>({mode: 'onChange'});

    const onSubmit: SubmitHandler<ISignIn> = async (data) => {
        await signIn(data).unwrap()
        console.log(data)
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
                    <h2 className={style.title}>Вход в личный кабинет</h2>
                </div>

                <div className={style.inputWrap}>
                        <div className={cn(style.inputContainer, {[style.error]: errors.identifier})}>
                            <input
                                id='username'
                                type='text' 
                                {...register('identifier', {
                                    required: 'Поле не может быть пустым'
                                })}
                                placeholder=' '
                            />
                            <label htmlFor='username'>Логин</label>
                            <div className={cn(style.hint, {[style.error]: errors.identifier})}>
                                {errors?.identifier && errors.identifier.message}
                            </div>
                        </div>
                        <div className={cn(style.inputContainer, {[style.error]: errors.password})}>
                            <input
                                id='password'
                                type={type} 
                                {...register('password', {
                                    required: 'Поле не может быть пустым',
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
                            <div className={cn(style.hint, {[style.error]: errors.password})}>
                                {errors?.password && errors.password.message}
                            </div>

                            
                        </div>
                    </div>

                    
                    <Button size='large' type='submit'>
                        вход
                    </Button>

            </form>
        </div>
    )
}