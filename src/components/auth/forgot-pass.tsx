import { FC, useState } from 'react'
import cn from 'classnames';
import {useForm, SubmitHandler} from 'react-hook-form'
import { Button } from '../button/button';
import {ReactComponent as EyeOpen} from '../../assets/eye-open.svg';
import {ReactComponent as EyeClosed} from '../../assets/eye-closed.svg';
import { Highlight } from '../highlight/highlight';

import style from './auth.module.css'

type Inputs = {
    email: string,
};


export const ForgotPass: FC = () => {

    const {
        register,
        formState: {
            errors,
        },
        handleSubmit,
        reset,
    } = useForm<Inputs>({mode: 'onChange'});

    const onSubmit: SubmitHandler<Inputs> = data => {
            console.log(data)
    };

    return (
        <div className={style.auth}>
            <h1>Cleverland</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={style.form}>

                <div className={style.titles}>
                    <h2 className={style.title}>Восстановление пароля</h2>
                </div>

                <div className={style.inputWrap}>
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
                            {errors?.email 
                                ? errors.email.message 
                                : 'На это email  будет отправлено письмо с инструкциями по восстановлению пароля'
                            }
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