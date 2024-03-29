import React, {useCallback, useEffect} from "react";
import {useDropzone} from "react-dropzone";
import {useForm} from "react-hook-form";

const FileInput = ({accept, name, label = name, mode = "update", errors}) => {
    const {register, unregister, setValue, watch} = useForm();

    const files = watch(name);

    const onDrop = useCallback(
        (droppedFiles) => {
            let newFiles =
                mode === "update" ? droppedFiles : [...(files || []), ...droppedFiles];
            if (mode === "append") {
                newFiles = newFiles.reduce((prev, file) => {
                    const fo = Object.entries(file);
                    if (
                        prev.find((e) => {
                            const eo = Object.entries(e);
                            return eo.every(
                                ([key, value], index) =>
                                    key === fo[index][0] && value === fo[index][1]
                            );
                        })
                    ) {
                        return prev;
                    } else {
                        return [...prev, file];
                    }
                }, []);
            }
            setValue(name, newFiles, {shouldValidate: true});
        },
        [setValue, name, mode, files]
    );

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: accept
    });

    useEffect(() => {
        register(name);
        return () => {
            unregister(name);
        };
    }, [register, unregister, name]);

    return (
        <div style={{padding: "100px"}}>
            <label
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
                htmlFor={name}
            >
                {label}
            </label>

            <div {...getRootProps()}>
                <input
                    name={name}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={name}
                    {...getInputProps()}
                />

                <label htmlFor={name}/>
                <input type="file"
                       id={name}
                />
                <div style={{color: 'red'}}>{errors.name?.message}</div>

                <div
                    className={
                        "w-full p-2 border border-dashed border-gray-900 " +
                        (isDragActive ? "bg-gray-400" : "bg-gray-200")
                    }
                >
                    <p className="text-center my-2">Drop the files here ...</p>
                    {!!files?.length && (
                        <div className="grid gap-1 grid-cols-4 mt-2">
                            {files.map((file) => {
                                return (
                                    <div key={file.name}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{width: "100px", height: "100px"}}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileInput;
