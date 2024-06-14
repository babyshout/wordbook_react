import {useEffect, useState} from "react";
import axios from "axios";
import serverUrl from "../../../assets/enum/serverUrl.js";

export default function useRecentlySearchWord(){

    const [recentlySearchWordOptions, setRecentlySearchWordOptions] = useState([])

    function getRecentlySearchWord() {
        console.log("getRecentlySearchWord 호출 시작!!!!");
        axios.get(
            serverUrl.word.search.getRecentlySearchWord,
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true,
            }
        ).then((response) => {
            console.log(response);
            setRecentlySearchWordOptions(response.data);
            // wordName option 테스트용 데이터
            // setRecentlySearchWordOptions(top100Films);
        }).catch((reason) => {
            console.log(reason)
            alert("알수없는 문제 발생")
        })


        setRecentlySearchWordOptions(top100Films)
        console.log('recentlySearchWordOptions -> ', recentlySearchWordOptions);
    }


    useEffect(() => {
        getRecentlySearchWord()

    }, []);

    return [recentlySearchWordOptions]

}

const options = ['Option 1', 'Option 2'];


const top100Films = [
    {wordName: 'The Shawshank Redemption', year: 1994},
    {wordName: 'The Godfather', year: 1972},
    {wordName: 'The Godfather: Part II', year: 1974},
    {wordName: 'The Dark Knight', year: 2008},
    {wordName: '12 Angry Men', year: 1957},
    {wordName: "Schindler's List", year: 1993},
    {wordName: 'Pulp Fiction', year: 1994},
    {
        wordName: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    {wordName: 'The Good, the Bad and the Ugly', year: 1966},
    {wordName: 'Fight Club', year: 1999},
    {
        wordName: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        wordName: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    {wordName: 'Forrest Gump', year: 1994},
    {wordName: 'Inception', year: 2010},
    {
        wordName: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    {wordName: "One Flew Over the Cuckoo's Nest", year: 1975},
    {wordName: 'Goodfellas', year: 1990},
    {wordName: 'The Matrix', year: 1999},
    {wordName: 'Seven Samurai', year: 1954},
    {
        wordName: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    {wordName: 'City of God', year: 2002},
    {wordName: 'Se7en', year: 1995},
    {wordName: 'The Silence of the Lambs', year: 1991},
    {wordName: "It's a Wonderful Life", year: 1946},
    {wordName: 'Life Is Beautiful', year: 1997},
    {wordName: 'The Usual Suspects', year: 1995},
    {wordName: 'Léon: The Professional', year: 1994},
    {wordName: 'Spirited Away', year: 2001},
    {wordName: 'Saving Private Ryan', year: 1998},
    {wordName: 'Once Upon a Time in the West', year: 1968},
    {wordName: 'American History X', year: 1998},
    {wordName: 'Interstellar', year: 2014},
    {wordName: 'Casablanca', year: 1942},
    {wordName: 'City Lights', year: 1931},
    {wordName: 'Psycho', year: 1960},
    {wordName: 'The Green Mile', year: 1999},
    {wordName: 'The Intouchables', year: 2011},
    {wordName: 'Modern Times', year: 1936},
    {wordName: 'Raiders of the Lost Ark', year: 1981},
    {wordName: 'Rear Window', year: 1954},
    {wordName: 'The Pianist', year: 2002},
    {wordName: 'The Departed', year: 2006},
    {wordName: 'Terminator 2: Judgment Day', year: 1991},
    {wordName: 'Back to the Future', year: 1985},
    {wordName: 'Whiplash', year: 2014},
    {wordName: 'Gladiator', year: 2000},
    {wordName: 'Memento', year: 2000},
    {wordName: 'The Prestige', year: 2006},
    {wordName: 'The Lion King', year: 1994},
    {wordName: 'Apocalypse Now', year: 1979},
    {wordName: 'Alien', year: 1979},
    {wordName: 'Sunset Boulevard', year: 1950},
    {
        wordName: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    {wordName: 'The Great Dictator', year: 1940},
    {wordName: 'Cinema Paradiso', year: 1988},
    {wordName: 'The Lives of Others', year: 2006},
    {wordName: 'Grave of the Fireflies', year: 1988},
    {wordName: 'Paths of Glory', year: 1957},
    {wordName: 'Django Unchained', year: 2012},
    {wordName: 'The Shining', year: 1980},
    {wordName: 'WALL·E', year: 2008},
    {wordName: 'American Beauty', year: 1999},
    {wordName: 'The Dark Knight Rises', year: 2012},
    {wordName: 'Princess Mononoke', year: 1997},
    {wordName: 'Aliens', year: 1986},
    {wordName: 'Oldboy', year: 2003},
    {wordName: 'Once Upon a Time in America', year: 1984},
    {wordName: 'Witness for the Prosecution', year: 1957},
    {wordName: 'Das Boot', year: 1981},
    {wordName: 'Citizen Kane', year: 1941},
    {wordName: 'North by Northwest', year: 1959},
    {wordName: 'Vertigo', year: 1958},
    {
        wordName: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    {wordName: 'Reservoir Dogs', year: 1992},
    {wordName: 'Braveheart', year: 1995},
    {wordName: 'M', year: 1931},
    {wordName: 'Requiem for a Dream', year: 2000},
    {wordName: 'Amélie', year: 2001},
    {wordName: 'A Clockwork Orange', year: 1971},
    {wordName: 'Like Stars on Earth', year: 2007},
    {wordName: 'Taxi Driver', year: 1976},
    {wordName: 'Lawrence of Arabia', year: 1962},
    {wordName: 'Double Indemnity', year: 1944},
    {
        wordName: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    {wordName: 'Amadeus', year: 1984},
    {wordName: 'To Kill a Mockingbird', year: 1962},
    {wordName: 'Toy Story 3', year: 2010},
    {wordName: 'Logan', year: 2017},
    {wordName: 'Full Metal Jacket', year: 1987},
    {wordName: 'Dangal', year: 2016},
    {wordName: 'The Sting', year: 1973},
    {wordName: '2001: A Space Odyssey', year: 1968},
    {wordName: "Singin' in the Rain", year: 1952},
    {wordName: 'Toy Story', year: 1995},
    {wordName: 'Bicycle Thieves', year: 1948},
    {wordName: 'The Kid', year: 1921},
    {wordName: 'Inglourious Basterds', year: 2009},
    {wordName: 'Snatch', year: 2000},
    {wordName: '3 Idiots', year: 2009},
    {wordName: 'Monty Python and the Holy Grail', year: 1975},
];
