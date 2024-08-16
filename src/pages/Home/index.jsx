import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote } from './styles';
import { Header } from '../../components/Header';
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";
import { Section } from "../../components/Section";
import { Note } from "../../components/Note";


import { api } from "../../services";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]); 
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleTagsSelected(tagName) {
    const alreadySelected = tagsSelected.includes(tagName);
    if (tagName == 'all') {
      return setTagsSelected([]);
    }
    
    if (alreadySelected) {
      setTagsSelected(prevState => prevState.filter(tag => tag !== tagName));
    } else {
      setTagsSelected(prevState => {
        const newTagsSelected = [...prevState, tagName];
        return newTagsSelected;
      });
    }
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
  
      setTags(response.data);
    }

    fetchTags();
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      console.log(response.data);
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>
      <Header/>
      <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            $isactive={String(tagsSelected.length === 0)}
            onClick={() => handleTagsSelected("all")}
          />
        </li>
        {
          tags && tags.map((tag) => (
            <li key={tag.id}>
              <ButtonText 
                title={tag.name}
                onClick={() => handleTagsSelected(tag.name)}
                isActive={String(tagsSelected.includes(tag.name))}
              />
            </li>
          ))
        }
      </Menu>
      <Search>
        <Input 
          placeholder="Pesquise pelo título" 
          icon={FiSearch}
          onChange={e => setSearch(e.target.value)}
        />
      </Search>
      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note
                key={String(note.id)} 
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>
      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}