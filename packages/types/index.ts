export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

export type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
  [Property in Key]-?: NonNullable<Type[Property]>
}
