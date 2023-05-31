function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}

const fetchAllBooks = async () => {
  try {
    const response = await fetch("http://localhost:3000/books", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    const textResult = JSON.stringify(result);

    document.getElementById("demo").innerHTML = textResult;

    let bookTemplate = document.getElementById("booklist");

    result.forEach((book) => console.log("forEach book: ", book));

    for (let i = 0; i < result.length; i++) {
      book = result[i];

      node = document.createElement("div");
      node.innerHTML = `
      <book-card title='${book.title}' author='${book.author}' rating="9" pages="390">
        <div slot="rating">${book.rating}</div>
        <div slot="pages">${book.pages}</div>
      </book-card>`;

      bookTemplate.appendChild(node);
    }
  } catch (err) {
    console.log("err is ", err);
  }
};

const fetchOneBook = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/books/646c3de5214ba23ae3b1a3a7",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const book = await response.json();
    let node = document.createElement("div");
    node.innerHTML = `
    <book-card title='${book.title}' author='${book.author}' rating="9" pages="390">
      <div slot="rating">${book.rating}</div>
      <div slot="pages">${book.pages}</div>
    </book-card>`;

    document.getElementById("onebook").appendChild(node);
  } catch (err) {
    console.log("err is ", err);
  }
};
