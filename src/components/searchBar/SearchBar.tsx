import _ from 'lodash';
import { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useTranslation } from 'react-i18next';
import { searchVideo } from 'services/MovieService';
import './SearchBar.scss'
import imgBlur from 'assets/404-error.png';
import { IMovie } from 'interface/Movies';
import { useNavigate } from 'react-router-dom';


type IResponse = {
    reason: string,
    value: string
}


const SearchBar = () => {
    const { t } = useTranslation()
    const imgUrl = process.env.REACT_APP_URL_IMG
    const navigate = useNavigate()

    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const title: string = t('page.search.title')
    useEffect(() => {
    }, [])

    const getSuggestions = (value: string): any => {
        const debounceScore = _.debounce(
            async () => {
                let { results }: any = await searchVideo(value)
                setSuggestions(results);
            },
            500,
            {
                leading: true,
                trailing: false,
            }
        );
        debounceScore();
    }

    const showDetailMovie = (value: IMovie) => {
        navigate(`movie/${value.id}`)
    }

    const renderSuggestion = (suggestion: any) => {
        return (
            <div className='flex' onClick={() => { showDetailMovie(suggestion) }}>
                <img alt="#" className="w-10 h-10" src={`${imgUrl}w342${suggestion.poster_path}`} />
                <div className="pl-2">
                    <div className="text-1-line text-left">
                        {suggestion.title}
                    </div>
                    <div className='text-1-line text-left'>{suggestion.release_date}</div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsClearRequested={() => setSuggestions([])}
                onSuggestionsFetchRequested={({ value }: IResponse) => {
                    setValue(value);
                    getSuggestions(value)
                }}
                getSuggestionValue={(suggestion: { title: string; }) => suggestion.title}
                renderSuggestion={(suggestion: any) => renderSuggestion(suggestion)}
                inputProps={{
                    placeholder: title,
                    value: value,
                    onChange: (_: any, { newValue, method }: any) => {
                        setValue(newValue);
                    },
                }}
                highlightFirstSuggestion={true}
            />
        </div>
    )
}

export default SearchBar
