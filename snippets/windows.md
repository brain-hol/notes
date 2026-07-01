# Windows

## Open JAR and WAR

If you tell Windows that JAR, WAR and EAR files are compressed folders, Explorer will show you what is inside without having to rename them to ZIP. Very helpful when there is a JAR inside a WAR.

Run this in an Administrative Command Prompt window:

```
assoc .jar=CompressedFolder
assoc .war=CompressedFolder
assoc .ear=CompressedFolder
```

## `assoc` Help

```
assoc /?
Displays or modifies file extension associations

ASSOC [.ext[=[fileType]]]

  .ext      Specifies the file extension to associate the file type with
  fileType  Specifies the file type to associate with the file extension

Type ASSOC without parameters to display the current file associations.
If ASSOC is invoked with just a file extension, it displays the current
file association for that file extension.  Specify nothing for the file
type and the command will delete the association for the file extension.
```
    