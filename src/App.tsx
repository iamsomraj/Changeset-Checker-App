import { useState } from "react";
import xmlToJSONUtility from "xml-js";
import "./App.css";

type ItemType = {
  key: string;
  value: string[];
};

interface TextType {
  _text: string;
}

type MemberType = TextType[] | TextType;

type XMLType = { members: MemberType; name: TextType };

const determineMemberType = (member: MemberType): member is TextType => {
  if ((member as TextType)._text) return true;
  return false;
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fileContent, setFileContent] = useState<string>("");
  let [results, setResults] = useState<
    { token: string; isFound: boolean; place: string }[] | null
  >(null);

  let fileReader: FileReader;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !searchQuery ||
        !fileContent ||
        searchQuery.trim().length === 0 ||
        fileContent.trim().length === 0
      ) {
        console.log("Search Query or File Content is null", {
          searchQuery,
          fileContent,
        });
        alert(
          "Search Query or File Content is null : Check Console For More Info"
        );
        return;
      }
      const jsonString = xmlToJSONUtility.xml2json(fileContent, {
        compact: true,
        spaces: 4,
      });

      const parsedJSON = JSON.parse(jsonString);
      console.log("Before Processing: ", { searchQuery, parsedJSON });

      const {
        fullName: { _text: changeSetName },
      } = parsedJSON.Package;

      const types: XMLType[] = parsedJSON.Package.types;

      let items: ItemType[] = [];

      items = types.map((type: XMLType) => {
        if (determineMemberType(type.members)) {
          let value = [];
          value.push(type.members._text);
          return {
            key: type.name._text,
            value,
          };
        } else {
          return {
            key: type.name._text,
            value: type.members.map((mem: TextType) => mem._text),
          };
        }
      });

      let tokens = searchQuery.split(",");

      tokens = tokens.map((tkn) => tkn.trim());

      const results = tokens.map((token) => {
        const item = items.find((itm: ItemType) => {
          return itm.value.find((it) => it === token);
        });

        return {
          token,
          isFound: item !== undefined,
          place: item === undefined ? "" : item.key,
        };
      });

      setResults(results);

      console.log("After Processing: ", { items, changeSetName, results });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileRead = () => {
    const content = fileReader.result;
    if (!content) {
      alert("File Upload failed : Check Console For More Info");
      console.log("File Upload failed", {
        content,
      });
      return;
    }
    setFileContent(content.toString());
  };

  const handleFileChosen = (files: FileList | null) => {
    if (!files) return;
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(files[0]);
  };

  return (
    <div className="App-header">
      <h1>Changeset Checker</h1>
      <form onSubmit={onSubmit} style={{ margin: "2rem" }}>
        <div>
          <textarea
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <input
            type="file"
            onChange={(e) => handleFileChosen(e.target.files)}
          />
        </div>
        <div>
          <button type="submit">Check</button>
        </div>
      </form>

      {results &&
        results.length > 0 &&
        results.map((result) => {
          return (
            <div
              key={result.token}
              style={{ color: result.isFound ? "green" : "red" }}
            >
              {result.isFound &&
                `${result.token} is present in ${result.place}`}
              {!result.isFound && `${result.token} is not present`}
            </div>
          );
        })}
    </div>
  );
}
