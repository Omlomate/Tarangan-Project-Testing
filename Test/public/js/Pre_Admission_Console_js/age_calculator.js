function calculateAge() {

    // To get current age taking current date as reference//
    // Date() function returns value as - Wed Mar 13 2024 22:44:42 GMT+0530 (India Standard Time) //
    // We need to split the date in years, months and days //

    var birthdate = document.getElementById("birthdate").value;
    var today = new Date();
    var birthDate = new Date(birthdate);


    var years = today.getFullYear() - birthDate.getFullYear();                                      // Getting YEAR from current date and birth date //
    var months = today.getMonth() - birthDate.getMonth();                                           // Getting MONTH from current date and birth date //
    var days = today.getDate() - birthDate.getDate();                                               // Getting DAY from current date and birth date //


    if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
        years--;
        months += 12;
    }

    if (days < 0) {
        var lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
        days += lastMonth.getDate();
        months--;
    }

    var current_age = years + " Years " + months + " Months " + days + " Days ";

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // To get age with 31-DEC-CurrentYear as reference date //

    var current_year = today.getFullYear();                                     // Get Current Year //
    var specificDate = new Date(current_year, 11, 31);                          // Format: year, month (0-indexed), day // Where month ranges from (0 - 11) // JAN = 0.... DEC = 11 //



    var years_1 = specificDate.getFullYear() - birthDate.getFullYear();
    var months_1 = specificDate.getMonth() - birthDate.getMonth();
    var days_1 = specificDate.getDate() - birthDate.getDate();

    if (months_1 < 0 || (months_1 === 0 && specificDate.getDate() < birthDate.getDate())) {
        years_1--;
        months_1 += 12;
    }

    if (days_1 < 0) {
        var lastMonth = new Date(specificDate.getFullYear(), specificDate.getMonth() - 1, 0);
        days_1 += lastMonth.getDate();
        months_1--;
    }

    var age_on_date = years_1 + " Years " + months_1 + " Months " + days_1 + " Days ";


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // To display class based on age as per 31-DEC //

    if ((years_1 >= 3 && years_1 <= 4)) {
        if (years_1 == 3) { var show_class = "Nursery" }
        else if (years_1 == 4 && months_1 <= 5 && days_1 <= 30) { var show_class = "Nursery / KG-1" }
        else if (years_1 == 4 && months_1 >= 5 && days_1 <= 30) { var show_class = "KG-1" }
        else if (years_1 == 4 && months_1 == 5 && days_1 >= 30) { var show_class = "KG-1" }
    }
    else if ((years_1 >= 4 && years_1 <= 5)) {
        if (years_1 == 4) { var show_class = "KG-1" }
        else if (years_1 == 5 && months_1 <= 5 && days_1 <= 30) { var show_class = "KG-1 / KG-2" }
        else if (years_1 == 5 && months_1 >= 5 && days_1 <= 30) { var show_class = "KG-2" }
        else if (years_1 == 5 && months_1 == 5 && days_1 >= 30) { var show_class = "KG-2" }

    }
    else if ((years_1 >= 5 && years_1 <= 6)) {
        if (years_1 == 5) { var show_class = "KG-2" }
        else if (years_1 == 6 && months_1 <= 5 && days_1 <= 30) { var show_class = "KG-2 / 1 ST" }
        else if (years_1 == 6 && months_1 >= 5 && days_1 <= 30) { var show_class = "1 ST" }
        else if (years_1 == 6 && months_1 == 5 && days_1 >= 30) { var show_class = "1 ST" }

    }
    else if ((years_1 >= 6 && years_1 <= 7)) {
        if (years_1 == 6) { var show_class = "1 ST" }
        else if (years_1 == 7 && months_1 <= 5 && days_1 <= 30) { var show_class = "1 ST / 2ND" }
        else if (years_1 == 7 && months_1 >= 5 && days_1 <= 30) { var show_class = "2 ND" }
        else if (years_1 == 7 && months_1 == 5 && days_1 >= 30) { var show_class = "2 ND" }

    }
    else if ((years_1 >= 7 && years_1 <= 8)) {
        if (years_1 == 7) { var show_class = "2 ND" }
        else if (years_1 == 8 && months_1 <= 5 && days_1 <= 30) { var show_class = "2 ND / 3RD" }
        else if (years_1 == 8 && months_1 >= 5 && days_1 <= 30) { var show_class = "3 RD" }
        else if (years_1 == 8 && months_1 == 5 && days_1 >= 30) { var show_class = "3 RD" }

    } else if ((years_1 >= 8 && years_1 <= 9)) {
        if (years_1 == 8) { var show_class = "3 RD" }
        else if (years_1 == 9 && months_1 <= 5 && days_1 <= 30) { var show_class = "3 RD / 4 TH" }
        else if (years_1 == 9 && months_1 >= 5 && days_1 <= 30) { var show_class = "4 TH" }
        else if (years_1 == 9 && months_1 == 5 && days_1 >= 30) { var show_class = "4 TH" }

    } else if ((years_1 >= 9 && years_1 <= 10)) {
        if (years_1 == 9) { var show_class = "4th" }
        else if (years_1 == 10 && months_1 <= 5 && days_1 <= 30) { var show_class = "4 TH / 5 TH" }
        else if (years_1 == 10 && months_1 >= 5 && days_1 <= 30) { var show_class = "5 TH" }
        else if (years_1 == 10 && months_1 == 5 && days_1 >= 30) { var show_class = "5 TH" }

    } else if ((years_1 >= 10 && years_1 <= 11)) {
        if (years_1 == 10) { var show_class = "5 TH" }
        else if (years_1 == 11 && months_1 <= 5 && days_1 <= 30) { var show_class = "5 TH / 6 TH" }
        else if (years_1 == 11 && months_1 >= 5 && days_1 <= 30) { var show_class = "6 TH" }
        else if (years_1 == 11 && months_1 == 5 && days_1 >= 30) { var show_class = "6 TH" }

    } else if (years_1 > 11) { var show_class = "7TH OR ABOVE" }
    else if (years_1 < 3) { var show_class = "VISIT NEXT YEAR" }


    // document.getElementById("show_age_details").innerText = "\n" + current_age + "\n\n" + age_on_date + "\n\n" + "Class of Admission: " + show_class;

    document.getElementById("currentAge").innerText = current_age;
    document.getElementById("ageOnDate").innerText = age_on_date;
    document.getElementById("classOfAdmission").innerText = show_class;

}

    