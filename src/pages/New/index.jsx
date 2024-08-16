import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import {Button} from "../../components/Button";
import {Container, Form} from "./styles";
import {Link} from "react-router-dom";

import { api } from "../../services";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function New() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* Links */
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  function handleLinks() {
    setLinks(prevLinks => [...prevLinks, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevLinks => prevLinks.filter(link => link !== deleted));
  }

  /* Tags */
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  function handleTags() {
    setTags(prevTags => [...prevTags, newTag]);
    setNewTag("");
  }

  function handleRemoveTags(deleted) {
    setTags(prevTags => prevTags.filter(tag => tag !== deleted));
  }

  /* New Note */
  async function handleNewNote() {
    if (!title) {
      return alert("Digite o título da nota");
    }

    if (newTag || newLink) {
      return alert("Campo tag e/ou link não foram adicionados");
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links   
    });

    alert("Nota criada com sucesso!");
    navigate("/");
  }

  return (
    <Container>
      <Header/>
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input 
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea 
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => {
                return <NoteItem 
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                />
              })
            }
            <NoteItem 
              isNew 
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleLinks}
            />
          </Section>

          <Section title="Marcadores">
            <div class="tags">
              {
                tags.map((tag, index) => {
                  return <NoteItem  
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTags(tag)}
                  />    
                })
              }
              <NoteItem 
                isNew 
                placeholder="Nova tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleTags}
              />
            </div>
          </Section>
          <Button 
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>  
      </main>  
    </Container>
  );
};