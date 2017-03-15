/*
 * Line Splits Example.
 * Written by Bryce Summers on 1 - 3 - 2017.
 * 
 * Purpose: Demonstrate a scribble formed from a collection of line segments and how it is cut into non-intersecting lines.
 */
function main()
{
    // str.toLowerCase();
    var categories = createCategories();
    var inputs     = parseInputs();

    /*
        Job:        <input type="text" name="job"        value=""><br>
        Discipline: <input type="text" name="discipline" value=""><br>
        Gender:     <input type="text" name="gender"     value=""><br>
        Religion:   <input type="text" name="religion"   value=""><br>
        Ideology:   <input type="text" name="ideology"   value=""><br>
        First Name: <input type="text" name="firstname"  value=""><br>
        Last Name:  <input type="text" name="lastname"   value=""><br>
    */

    var predicates = computePredicates(inputs, categories);

    var output_element = document.getElementById("output");
    var str = outputString(inputs, predicates);
    output_element.innerHTML = str;
}

function createCategories()
{
    var out    = {};
    out.job    = ["Housewife", "Barber", "Lawyer", "Dentist", "Buisnessman", "Painter", "Artist"];
    out.discipline = ["Buisnessman", "Housewife", "Doctor", "Lawyer", "IT", "Programmer", "Scientist", "Artist", "Mathmatician", "Musician", "Beggar", "Painter",
                        "Carpenter", "Plumber", "Chairmaker", "Secretary", "Nurse", "Volunteer", "Dentist"];
    out.gender = ["Male", "Female", "Bryce", "Other"];
    out.religion = ["Christian", "Muslim", "Hindu", "Aetheist", "Bryce"];
    out.ideology = ["Republican", "Democrat", "Libertarian", "Novelty"];
    out.firstname = ["Bryce", "Mary", "Bruce", "Katey", "Golan", "Kayvon"];
    out.lastname = ["Summers", "Levin", "Fatahalian"];

    return out;
}

// Parses inputs from the url argument strings.
function parseInputs()
{
    var output = {};
    var query = window.location.search.substring(0);
    console.log(query);

    output.job        = gup("job", query);
    output.discipline = gup("discipline", query);
    output.gender     = gup("gender", query);
    output.religion   = gup("religion", query);
    output.ideology   = gup("ideology", query);
    output.firstname  = gup("firstname", query);
    output.lastname   = gup("lastname", query);

    console.log(output);

    return output;
}

function computePredicates(inputs, categories)
{
    console.log(categories);
    var out = {};
    out.job        = checkForInclusion(inputs.job.toLowerCase(),        categories.job);
    out.discipline = checkForInclusion(inputs.discipline.toLowerCase(), categories.discipline);
    out.gender     = checkForInclusion(inputs.gender.toLowerCase(),     categories.gender);
    out.religion   = checkForInclusion(inputs.religion.toLowerCase(),   categories.religion);
    out.ideology   = checkForInclusion(inputs.ideology.toLowerCase(),   categories.ideology);
    out.firstname  = checkForInclusion(inputs.firstname.toLowerCase(),  categories.firstname);
    out.lastname   = checkForInclusion(inputs.lastname.toLowerCase(),   categories.lastname);
    return out;
}

// Returns true iff the given input element is in the set.
function checkForInclusion(element, array)
{

    if(element === null || element === "")
    {
        return true;
    }

    var len = array.length;
    for(var i = 0; i < len; i++)
    {
        if(array[i].toLowerCase() === element.toLowerCase())
        {
            return true;
        }
    }

    return false;
}

function outputString(inputs, predicates)
{
    var str = "";
    var endl = "<br>";

    if(!predicates.job)
    {
        str += error_message(inputs.job, "job");
    }

    if(!predicates.discipline)
    {
        str += error_message(inputs.discipline, "discipline");
    }

    if(!predicates.gender)
    {
        str += error_message(inputs.gender, "gender");
    }

    if(!predicates.religion)
    {
        str += error_message(inputs.religion, "religion");
    }

    if(!predicates.ideology)
    {
        str += error_message(inputs.ideology, "ideology");
    }

    if(!predicates.firstname)
    {
        str += error_message(inputs.firstname, "firstname");
    }

    if(!predicates.lastname)
    {
        str += error_message(inputs.lastname, "lastname");
    }

    if(str.length < 1)
    {
        str += "Thank you! Please have a nice day!";
    }

    return str;

}

function error_message(input_str, category_type_string)
{
    var rand = Math.random();
    var len = 3;
    str = "";
    var endl = "<br>";

    if(rand < 1.0/len)
    {
        str += "Regretably, " + input_str + " is not a " + category_type_string + " in our system." + endl;
        return str;
    }

    if(rand < 2.0 / len)
    {
        str += input_str + " is not an official " + category_type_string + "." + endl;
        return str;
    }

    if(rand < 3.0 / len)
    {
        str += "We can't find the " + input_str + " " + category_type_string + "." + endl;
        return str;
    }

    return "Error";

}

// This function is from the internet and is used to retrieve input variables from this website.
function gup( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}


// Run Example.
main();
