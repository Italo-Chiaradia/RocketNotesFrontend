import {FiArrowLeft, FiUser, FiMail, FiLock, FiCamera} from "react-icons/fi";
import {Container, Form, Avatar} from "./styles";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {Link} from "react-router-dom";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg";

import { api } from "../../services";
import { useState } from "react";
import { useAuth } from "../../hooks/auth";

export function Profile() {
  const {user, updateUser} = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

  function handleUpdate() {
    const updated = {
      name, 
      email,
      password: passwordNew,
      old_password: passwordOld
    };
    const userUpdated = Object.assign(updated, user);
    return updateUser({user: userUpdated, avatarFile});
  }
  
  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft/>
        </Link>
      </header>
      <Form>
        <Avatar>
          <img 
            src={avatar} 
            alt="Foto de usuário" 
          />
          <label htmlFor="avatar">
            <FiCamera/>  
            <input 
              id="avatar" 
              type="file" 
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input
          icon={FiUser}
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          icon={FiMail}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          class="2-input"
          icon={FiLock}
          type="password"
          placeholder="Senha atual"
          onChange={e => setPasswordOld(e.target.value)}
        />
        <Input  
          icon={FiLock}
          type="password"
          placeholder="Nova senha"
          onChange={e => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate}/>
      </Form>
    </Container>
  );
};