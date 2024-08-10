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
    setOpenFolders((prev) => {
      if (prev.includes(folderPath)) {
        // If the folder is already open, close it and all its child folders
        const newOpenFolders = prev.filter((path) => !path.startsWith(folderPath));
        return newOpenFolders;
      } else {
        // If the folder is closed, open it
        return [...prev, folderPath];
      }
    });
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (!selectedItem) return;
  
      // Filter the flatList to include only items in open folders
      const visibleItems = flatList.filter(item => {
        const parentPath = item.path.split('/').slice(0, -1).join('/');
        return !parentPath || openFolders.includes(parentPath);
      });
  
      const currentIndex = visibleItems.findIndex((item) => item.path === selectedItem.path);
      let newIndex = currentIndex;
  
      switch (event.key) {
        case 'ArrowUp':
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case 'ArrowDown':
          newIndex = Math.min(visibleItems.length - 1, currentIndex + 1);
          break;
        case 'Enter':
          if (selectedItem.type === 'folder') {
            toggleFolder(selectedItem.path);
          } else {
            selectionCallback(selectedItem.file, selectedItem.name);
          }
          break;
        default:
          break;
      }
  
      if (currentIndex !== newIndex) {
        setSelectedItem(visibleItems[newIndex]);
      }
    },
    [selectedItem, flatList, openFolders, toggleFolder, selectionCallback]
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
