// components/FileManager.js
'use client';
import style from './file_manager.module.scss'
import data from '../public/data_json/content.json'

import { useState, useEffect, useCallback } from 'react';


const files = data;

const FileManager = ({selectionCallback}) => {
  const [openFolders, setOpenFolders] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [flatList, setFlatList] = useState([]);

  useEffect(() => {
    const flatFiles = flattenFiles(files);
    setFlatList(flatFiles);
    setSelectedItem(flatFiles[0]);
    (selectedItem);
    selectionCallback(files[0].file, files[0].name);
  }, []);

  const flattenFiles = (files, parent = '') => {
    return files.reduce((acc, file) => {
      const path = parent ? `${parent}/${file.name}` : file.name;
      acc.push({ ...file, path });
      if (file.type === 'folder' && file.files) {
        acc = acc.concat(flattenFiles(file.files, path));
      }
      return acc;
    }, []);
  };

  const toggleFolder = (folderPath) => {
    setOpenFolders((prev) =>
      prev.includes(folderPath)
        ? prev.filter((path) => path !== folderPath)
        : [...prev, folderPath]
    );
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (!selectedItem) return;
      const currentIndex = flatList.findIndex((item) => item.path === selectedItem.path);
      let newIndex = currentIndex;

      ("keydown");

      switch (event.key) {
        case 'ArrowUp':
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case 'ArrowDown':
          newIndex = Math.min(flatList.length - 1, currentIndex + 1);
          break;
        case 'Enter':
          if (selectedItem.type === 'folder') {
            toggleFolder(selectedItem.path);
          }else{
            selectionCallback(selectedItem.file, selectedItem.name);
          }
          break;
        default:
          break;
      }

      setSelectedItem(flatList[newIndex]);
      (flatList[newIndex])
    },
    [selectedItem, flatList, toggleFolder]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);


  function checkIdentity (a, b){
    return a?.name+a?.type == b?.name+b?.type? true: false;
  }

  const renderFiles = (files, parent = '') => {
    console.log(selectedItem);
    return files.map((file) => {
      const path = parent ? `${parent}/${file.name}` : file.name;
      if (file.type === 'folder') {
        const isOpen = openFolders.includes(path);
        return (
          <div key={path}>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => toggleFolder(path)}

            >
              <div className={style.file_manager__title} style={{'--dynamic-decor': checkIdentity(selectedItem, file) || isOpen? 'solid': 'none'}}>
                {isOpen ? <h3>\/</h3> : <h3>{">"}</h3>}
                <h3 >{file.name}</h3>
              </div>
            </div>
            {isOpen && <div className='ml-8'>{renderFiles(file.files, path)}</div>}
          </div>
        );
      }
      else {
        return (
          <div key={path} className={style.file_manager__file}  style={{ '--dynamic-color': file.color, '--dynamic-decor': checkIdentity(selectedItem, file) ? 'solid': 'none' }}>
             <div className={style.file_manager__title} >
            <h3 >{file.name}</h3>
            </div>
          </div>
        );
      }
    });
  };

  return <div className={style.file_manager}>{renderFiles(files)}</div>;
};

export default FileManager;
