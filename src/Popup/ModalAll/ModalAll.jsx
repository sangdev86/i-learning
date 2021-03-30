import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { CourseWillUpdate } from "../../Redux/Actions/course";
import { myModal } from "../../Redux/Actions/modal";

export default function ModalAll({ width, component }) {
  const modal = useSelector((state) => state.modal.modal);
  const dispatch = useDispatch();
  const CloseModal = () => {
    dispatch(myModal(modal));
    dispatch(CourseWillUpdate([]));
  };
  return (
    <div className="my-modal">
      <div className="screen-modal" style={{ width: width }}>
        <div className="header d-flex justify-content-end align-items-center">
          <span
            className="p-1 text-danger cursor-pointer"
            onClick={() => CloseModal()}
          >
            <RiCloseCircleFill />
          </span>
        </div>
        <div className="body">{component}</div>
      </div>
    </div>
  );
}
