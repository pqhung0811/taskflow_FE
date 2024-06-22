import { useMemo } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FIcon from "../assets/icons";
import { BsCloudDownload, BsTrash } from "react-icons/bs";
import Helper from "../helpers";
const { PDFIcon, DocxIcon, ExcelIcon, PptIcon, ZipIcon, FileIcon, ImageIcon } =
  FIcon;
export default function FileCard({
  id,
  name = "",
  onClick,
  onDelete,
  date,
  size,
}) {
  const icon = useMemo(() => {
    const type = name.substring(name.lastIndexOf("."));
    switch (type) {
      case ".pdf":
      case ".html":
        return <PDFIcon />;
      case ".doc":
      case ".odt":
      case ".docx":
        return <DocxIcon />;
      case ".xls":
      case ".xlsx":
      case ".xlsm":
        return <ExcelIcon />;
      case ".ppt":
      case ".pptx":
        return <PptIcon />;
      case ".zip":
        return <ZipIcon />;
      case ".png":
      case ".jpg":
      case ".jpeg":
      case ".webp":
        return <ImageIcon />;

      default:
        return <FileIcon />;
    }
  }, [name]);
  return (
    <div className="file-card">
      <div className="tf-file-action">
        <Dropdown>
          <DropdownButton as={ButtonGroup}>
            <Dropdown.Item
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                await onClick();
              }}
              className="d-inline-flex align-items-center gap-2"
            >
              <BsCloudDownload/>Download
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={async (e) => {
                e.preventDefault();
                await onDelete(id);
              }}
              className="d-inline-flex align-items-center gap-2"
              style={{color: "var(--text-error)"}}
            >
              <BsTrash />Delete
            </Dropdown.Item>
          </DropdownButton>
        </Dropdown>
      </div>
      <div className="tf-file-info">
        <div className="tf-file-icon">
          <div className="tf-file-icon-type">{icon}</div>
        </div>
        <div className="tf-file-title">
          <div className="tf-filename-text">{name}</div>
          <ul className="info d-flex flex-wrap">
            {!!date && <li className="date">{Helper.formatDate(date)}</li>}
            {!!size && <li className="size">{Helper.convertFileSize(size)}</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
