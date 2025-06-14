import { db } from "../firebase.js";
const recruitContainer = document.getElementById("resultsContainer");
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const applyBtn = document.querySelector(".apply-button-all");
const container = document.getElementById("resultsContainer");

console.log(applyBtn);

applyBtn.addEventListener("click", async () => {
  console.log("Added");
  await applyFilters();
});

// Toggle dropdown visibility
export function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  const allDropdowns = document.querySelectorAll(
    ".dropdown, .dropdown-container"
  );

  allDropdowns.forEach((dd) => {
    if (dd !== dropdown) dd.style.display = "none";
  });

  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

// Clear selection in the dropdown
export async function clearSelection(type) {
  const radios = document.querySelectorAll(`input[name="${type}"]`);
  radios.forEach((radio) => {
    radio.checked = false;
  });
  document.getElementById(
    type === "domain" ? "domainDropdown" : "yearDropdown"
  ).style.display = "none";
   if (recruitContainer) {
    recruitContainer.innerHTML = "";
    applyFilters();
    
  }
  

}
window.clearSelection = clearSelection;

// Clear all filters in the main filter dropdown
export function clearAllFilters() {
  document
    .querySelectorAll('.dropdown-container input[type="radio"]')
    .forEach((radio) => {
      radio.checked = false;
    });
  document.getElementById("filterDropdown").style.display = "none";

  if (recruitContainer) {
    container.innerHTML = `<h1 style="text-align: center; padding:6px; font-size: 18px; color: #000; ">Filtered recruits</h1>`;
    applyFilters();
 
  }
  
}

window.clearAllFilters = clearAllFilters;


export async function applyFilters() {
  const selectedDomain = document.querySelector('input[name="domain"]:checked');
  const selectedYear = document.querySelector('input[name="year"]:checked');

  // If neither is selected, hide container & exit
  if (!selectedDomain && !selectedYear) {
    container.innerHTML = ``;
    container.style.display = "none";
    return;
  }

  const filters = [];

  if (selectedDomain) {
    filters.push(where("interestField", "==", selectedDomain.value));
  }

  if (selectedYear) {
    filters.push(where("year", "==", selectedYear.value));
  }

  const recruitQuery = query(collection(db, "recruits"), ...filters);

  try {
    const querySnapshot = await getDocs(recruitQuery);
    const filteredData = [];

    querySnapshot.forEach((doc) => {
      filteredData.push(doc.data());
    });

    displayFilteredData(filteredData);
    
  document.getElementById("filterDropdown").style.display = "none";


    // Show applied filters message (optional)
    let message = "🎯 Applied Filters:\n";
    if (selectedDomain) message += `Domain: ${selectedDomain.value}\n`;
    if (selectedYear) message += `Year: ${selectedYear.value}`;
    alert(message);
  } catch (error) {
    console.error("🔥 Error fetching recruits:", error);
    alert("Something went wrong fetching the data 😵");
  }
}






// Display the filtered data (you can update this based on your UI)

function displayFilteredData(data) {
  container.style.display = "block"; // Show the container
  container.innerHTML = `<h1 style="text-align: center; color: #000; padding:6px; font-size: 18px;">Filtered recruits</h1>`;
  if (data.length === 0) {
    const noResult = document.createElement("div");
    noResult.classList.add("no-results");
    noResult.textContent = "No results found 😓";
    container.appendChild(noResult);
    return;
  }

  data.forEach((item) => {
    const outerDiv = document.createElement("div");
    outerDiv.classList.add("recruitreq");

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("recruitreq-header");

    // Name span
    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.fullName || "N/A";
    headerDiv.appendChild(nameSpan);

    // Spacer
    headerDiv.appendChild(document.createTextNode("\u00A0"));

    // USN span
    const usnSpan = document.createElement("span");
    usnSpan.textContent = item.usn || "N/A";
    headerDiv.appendChild(usnSpan);

    // Spacer
    headerDiv.appendChild(document.createTextNode("\u00A0"));

    // Arrow span
    const arrowSpan = document.createElement("span");
    arrowSpan.textContent = "\u25BC"; // ▼
    headerDiv.appendChild(arrowSpan);

    outerDiv.appendChild(headerDiv);

    const ul = document.createElement("ul");
    ul.classList.add("recruitreq-details");
    ul.style.display = "none"; // hidden by default

    const fields = [
      ["Name", item.fullName],
      ["USN", item.usn],
      ["Contact", item.phone || item.mobile],
      ["Email", item.email],
      ["Year", item.year],
      ["Branch", item.branch],
      ["Section", item.section],
      ["Domain", item.interestField],
    ];

    fields.forEach(([label, val]) => {
      const li = document.createElement("li");
      li.innerHTML = `${label} : <span class="${label.toLowerCase()}">${val || "N/A"}</span>`;
      ul.appendChild(li);
    });

    outerDiv.appendChild(ul);

    // Toggle dropdown on outerDiv click
    outerDiv.addEventListener("click", () => {
      if (ul.style.display === "none") {
        ul.style.display = "block";
        arrowSpan.style.transform = "rotate(180deg)";
      } else {
        ul.style.display = "none";
        arrowSpan.style.transform = "rotate(0deg)";
      }
    });

    container.appendChild(outerDiv);
  });
}










  

// Apply filter for Domain dropdown and close it
export function applyDomainFilter() {
  document.getElementById("domainDropdown").style.display = "none";
  applyFilters();
}
export function applyYearFilter() {
  document.getElementById("yearDropdown").style.display = "none";
  applyFilters();
}

window.applyDomainFilter = applyDomainFilter;
window.applyYearFilter = applyYearFilter;

