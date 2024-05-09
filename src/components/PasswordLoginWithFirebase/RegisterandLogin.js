import classNames from 'classnames/bind';
import styles from './RegisterandLogin.module.scss';
import { databate } from './FireBaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../button/Button';
import { SpotifyIcon } from '~/assets/Icon/Icon';

const cx = classNames.bind(styles);

function RegisterAndLogin() {
    const history = useNavigate();
    const handleSubmit = (e, type) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.yourname.value;

        createUserWithEmailAndPassword(databate, email, password)
            .then(async (data) => {
                const user = data.user;
                await updateProfile(user, {
                    displayName: name,
                });
                history('/');
                console.log(data, 'audata');
            })
            .catch((err) => {
                alert(err.code);
            });
    };
    return (
        <div className={cx('form_login')}>
            <h2>Đăng ký miễn phí</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={cx('name')}>
                    <label for="Email">Số điện thoại</label>
                    <input name="yourname" placeholder="Nhập SĐT" />
                </div>
                <div className={cx('password')}>
                    <label for="password">Tạo mật khẩu</label>
                    <input name="password" type="password" placeholder="Tạo mật khẩu." />
                </div>
                <div className={cx('email')}>
                    <label for="Email">Email của bạn là gì?</label>
                    <input name="email" placeholder="Nhập email của bạn." />
                </div>
                <button className={cx('register')}>Đăng ký</button>
                <p>
                    Bạn có tài khoản? <Button to="/login">Đăng nhập.</Button>
                </p>
            </form>
        </div>
    );
}

export default RegisterAndLogin;
