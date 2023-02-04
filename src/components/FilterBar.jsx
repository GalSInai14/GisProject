import React from "react";
import { useState } from "react";
import { AiOutlineReload } from "react-icons/ai";

function FilterBar(props) {
  const [team, setTeam] = useState("");
  const [city, setCity] = useState("");
  const [league, setLeague] = useState("");

  const cities = [
    "London",
    "Manchester",
    "Newcastle upon Tyne",
    "Liverpool",
    "Brighton",
    "Birmingham",
    "Leicester",
    "Bournemouth",
    "Leeds",
    "Nottingham",
    "Southampton",
    "Wolverhampton",
    "Burnley",
    "Sheffield",
    "Blackburn",
    "Watford",
    "Norwich",
    "Preston",
    "Coventry",
    "Swansea",
    "Reading",
    "Sunderland",
    "Middlesbrough",
    "Luton",
    "West Bromwich",
    "Stoke-on-Trent",
    "Bristol",
    "Rotherham",
    "Cardiff",
    "Hull",
    "Blackpool",
    "Wigan",
    "Huddersfield",
    "Plymouth",
    "Ipswich",
    "Barnsley",
    "Bolton",
    "Derby",
    "Wycombe",
    "Peterborough",
    "Portsmouth",
    "Shrewsbury",
    "Exeter",
    "Lincoln",
    "Oxford",
    "Fleetwood",
    "Cheltenham",
    "Accrington",
    "Cambridge",
    "Nailsworth",
    "Milton Keynes",
    "Burton-upon-Trent",
    "Morecambe",
    "Stevenage",
    "Northampton",
    "Swindon",
    "Barrow-in-Furness",
    "Mansfield",
    "Carlisle",
    "Bradford",
    "Salford",
    "Doncaster",
    "Walsall",
    "Stockport",
    "Cleethorpes",
    "Birkenhead",
    "Crewe",
    "Newport",
    "Crawley",
    "Harrogate",
    "Rochdale",
    "Hartlepool",
    "Colchester",
    "Gillingham",
  ];
  const teams = [
    "Arsenal",
    "Manchester City",
    "Newcastle United",
    "Tottenham Hotspur",
    "Manchester United",
    "Liverpool",
    "Brighton & Hove Albion",
    "Chelsea",
    "Fulham",
    "Brentford",
    "Crystal Palace",
    "Aston Villa",
    "Leicester City",
    "Bournemouth",
    "Leeds United",
    "West Ham United",
    "Everton",
    "Nottingham Forest",
    "Southampton",
    "Wolverhampton Wanderers",
    "Burnley",
    "Sheffield United",
    "Blackburn Rovers",
    "Watford",
    "Norwich City",
    "Queens Park Rangers",
    "Preston North End",
    "Coventry City",
    "Birmingham City",
    "Millwall",
    "Swansea City",
    "Reading",
    "Sunderland",
    "Middlesbrough",
    "Luton Town",
    "West Bromwich Albion",
    "Stoke City",
    "Bristol City",
    "Rotherham United",
    "Cardiff City",
    "Hull City",
    "Blackpool",
    "Wigan Athletic",
    "Huddersfield Town",
    "Plymouth Argyle",
    "Ipswich Town",
    "Sheffield Wednesday",
    "Barnsley",
    "Bolton Wanderers",
    "Derby County",
    "Wycombe Wanderers",
    "Peterborough United",
    "Bristol Rovers",
    "Portsmouth",
    "Shrewsbury Town",
    "Port Vale",
    "Exeter City",
    "Lincoln City",
    "Oxford United",
    "Fleetwood Town",
    "Cheltenham Town",
    "Charlton Athletic",
    "Accrington Stanley",
    "Cambridge United",
    "Forest Green Rovers",
    "Milton Keynes Dons",
    "Burton Albion",
    "Morecambe",
    "Leyton Orient",
    "Stevenage",
    "Northampton Town",
    "Swindon Town",
    "Barrow",
    "Mansfield Town",
    "Carlisle United",
    "Bradford City",
    "Salford City",
    "Doncaster Rovers",
    "Walsall",
    "AFC Wimbledon",
    "Stockport County",
    "Grimsby Town",
    "Tranmere Rovers",
    "Sutton United",
    "Crewe Alexandra",
    "Newport County",
    "Crawley Town",
    "Harrogate Town",
    "Rochdale",
    "Hartlepool United",
    "Colchester United",
    "Gillingham",
  ];

  const leagues = [
    "Premier League",
    "EFL Championship",
    "EFL League One",
    "EFL League Two",
  ];

  const handleTeamChange = (e) => {
    setTeam(e.target.value);
    setCity();
    setLeague();
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
    setTeam();
  };
  const handleLeagueChange = (e) => {
    setLeague(e.target.value);
    setTeam();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(team, city, league);
  };

  const handleReload = (e) => {
    e.preventDefault();
    setCity(null);
    setTeam(null);
    setLeague(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mt-2">
          <div className="w-full md:w-50%  shadow p-5 rounded-lg bg-white">
            <div className="relative"></div>

            <div className="flex items-center justify-between mt-4">
              <p className="font-medium">Filters</p>

              <button
                type="button"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 lg:text-2xl sm:text-sm font-medium rounded-md"
                onClick={handleReload}
              >
                <AiOutlineReload />
              </button>
            </div>

            <div>
              <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                <select
                  value={city || ""}
                  onChange={handleCityChange}
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                >
                  <option value="">עיר</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={team || ""}
                  onChange={handleTeamChange}
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                >
                  <option value="">קבוצה</option>
                  {teams.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                <select
                  value={league || ""}
                  onChange={handleLeagueChange}
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                >
                  <option value="">ליגה</option>
                  {leagues.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-50% text-center mt-5 text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              חפש אצטדיון
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default FilterBar;
