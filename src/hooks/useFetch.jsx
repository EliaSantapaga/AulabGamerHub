function useFetch() {
  useEffect(() => {
    setError('');
    setLoading(true);

    async function getDeveloper({developer}) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&page=${pagination}&developers=${developer}`
        );

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setDeveloperGames(json.results);
        } else {
          setError('Ops, riprova la tua chiamata API');
        }

        setLoading(false);
      } catch (error) {
        setError('Ops, pagina non trovata', error.message);
      }
    }
    getDeveloper();
  }, [developer, pagination]);

  return <h1>test</h1>;
}

export default useFetch;
