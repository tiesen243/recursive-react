import * as lucide from 'lucide-react'
import * as React from 'react'

import * as styles from './app.module.css'
import { nodes } from './data.json'

export const App: React.FC = () => (
  <div className={styles.container}>
    <h1>Folder Structure</h1>

    <div className={styles.wrapper}>
      <Folder nodes={nodes} />
    </div>
  </div>
)

type Node = {
  label: string
  nodes?: Node[]
}

const FolderItem: React.FC<{ node: Node }> = ({ node }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const toggle = () => setIsOpen((prev) => !prev)
  let Icon: lucide.LucideIcon = lucide.TextIcon

  if (!node.nodes) {
    const type = (node.label.split('.').pop() || 'default').toLowerCase() as keyof typeof icons
    Icon = icons[type] || icons.default
  }

  const FolderIcon: lucide.LucideIcon = isOpen ? lucide.FolderOpenIcon : lucide.LucideFolder

  return (
    <li className={styles.folder__item}>
      <div className={styles.folder__label} onClick={toggle}>
        {node.nodes ? <FolderIcon size={16} /> : <Icon size={16} />}

        <span className={styles.folder__text}>{node.label}</span>
      </div>

      {node.nodes && isOpen && <Folder nodes={node.nodes} />}
    </li>
  )
}

const Folder: React.FC<{ nodes: Node[] }> = ({ nodes }) => (
  <ul className={styles.folder}>
    {nodes.map((node) => (
      <FolderItem key={node.label} node={node} />
    ))}
  </ul>
)

const icons = {
  mp4: lucide.FileVideoIcon,
  mp3: lucide.FileMusicIcon,
  jpg: lucide.FileImageIcon,
  png: lucide.FileImageIcon,
  jpeg: lucide.FileImageIcon,
  xls: lucide.FileSpreadsheetIcon,
  default: lucide.FileTextIcon,
}
