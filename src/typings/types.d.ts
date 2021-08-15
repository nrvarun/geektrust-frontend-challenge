import React, { ChangeEvent, ComponentPropsWithRef, FormEvent } from "react";

export type UserDataType = {
  email: string;
  id: string;
  name: string;
  role: string;
  isHeader?: boolean;
};

export type UserActionsType = {
  isChecked?: boolean;
  onCheck: (e: ChangeEvent<HTMLInputElement>) => void;
  onEdit: (e: string) => void;
  onDelete: (e: string) => void;
};

export type ModalType = {
  title: string;
  visible: boolean;
  children: React.ReactNode;
  props?: ComponentPropsWithRef<HTMLDivElement>;
  handleModal: () => void;
};
